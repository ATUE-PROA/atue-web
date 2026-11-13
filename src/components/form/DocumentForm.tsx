import { useEffect, useRef, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Loader2,
  Paperclip,
  Search,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FORM_CONTENT } from '@/content/form'
import { formatCnpj, normalizeCnpj } from '@/lib/cnpj'
import { formatFileSize } from '@/lib/document-intake'
import { formSchema } from '@/lib/form'
import { lookupCnpj } from '@/services/cnpj'
import { submitForm } from '@/services/form'
import { saveInstitutionalProfile } from '@/services/organization'
import { cn } from '@/lib/utils'
import type { FormValues } from '@/types/form.types'

type SubmissionResult = 'idle' | 'success' | 'error'
type LookupStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

const STEPS = FORM_CONTENT.steps

const STEP_FIELDS: readonly (readonly (keyof FormValues)[])[] = [
  ['cnpj', 'url', 'empresa'],
  ['email', 'dpoNome', 'dpoEmail'],
  ['finalidades', 'documentos', 'observacoes'],
]

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const textareaClasses =
  'min-h-24 resize-y rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const {
  formTitle,
  formDescription,
  fields,
  files,
  lookup,
  submitLabel,
  submittingLabel,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
  demoNotice,
} = FORM_CONTENT

function CnpjLookupStatus({ status }: { status: LookupStatus }) {
  if (status === 'idle') {
    return null
  }

  if (status === 'loading') {
    return (
      <p role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
        {lookup.loading}
      </p>
    )
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="flex items-start gap-1.5 text-xs text-green-800 dark:text-green-300"
      >
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        {lookup.success}
      </p>
    )
  }

  return (
    <p role="alert" className="flex items-start gap-1.5 text-xs text-destructive">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      {status === 'not-found' ? lookup.notFound : lookup.error}
    </p>
  )
}

export function DocumentForm() {
  const [stepIndex, setStepIndex] = useState(0)
  const [result, setResult] = useState<SubmissionResult>('idle')
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>('idle')
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      url: '',
      empresa: '',
      email: '',
      dpoNome: '',
      dpoEmail: '',
      finalidades: '',
      documentos: undefined,
      observacoes: '',
    },
  })

  const watched = useWatch({ control })
  const selectedFiles = watched.documentos ? Array.from(watched.documentos) : []
  const isLastStep = stepIndex === STEPS.length - 1
  const currentStep = STEPS[stepIndex]
  const previousStepRef = useRef(stepIndex)

  useEffect(() => {
    if (previousStepRef.current === stepIndex) {
      return
    }

    previousStepRef.current = stepIndex
    stepHeadingRef.current?.focus()
  }, [stepIndex])

  const onSubmit = async (values: FormValues) => {
    if (lookupStatus === 'loading') {
      return
    }

    setResult('idle')

    try {
      await submitForm(values)
      saveInstitutionalProfile(values)
      reset()
      setStepIndex(0)
      setResult('success')
    } catch {
      setResult('error')
    }
  }

  const handleNext = async () => {
    const isValid = await trigger(STEP_FIELDS[stepIndex], { shouldFocus: true })

    if (isValid) {
      setStepIndex((current) => Math.min(current + 1, STEPS.length - 1))
    }
  }

  const handleCnpjLookup = async () => {
    const isValid = await trigger('cnpj')

    if (!isValid) {
      setLookupStatus('idle')
      return
    }

    const cnpj = normalizeCnpj(getValues('cnpj'))
    setLookupStatus('loading')

    try {
      const data = await lookupCnpj(cnpj)

      if (normalizeCnpj(getValues('cnpj')) !== cnpj) {
        return
      }

      if (!data) {
        setLookupStatus('not-found')
        return
      }

      const empresa = data.razaoSocial || data.nomeFantasia

      if (empresa) {
        setValue('empresa', empresa, { shouldDirty: true, shouldValidate: true })
      }

      if (data.email.includes('@')) {
        setValue('email', data.email, { shouldDirty: true, shouldValidate: true })
      }

      setLookupStatus('success')
    } catch {
      if (normalizeCnpj(getValues('cnpj')) !== cnpj) {
        return
      }

      setLookupStatus('error')
    }
  }

  const summaryItems = [
    { label: fields.empresa.label, value: watched.empresa },
    { label: fields.cnpj.label, value: watched.cnpj },
    { label: fields.url.label, value: watched.url },
    { label: fields.email.label, value: watched.email },
    { label: fields.dpoNome.label, value: watched.dpoNome },
    { label: fields.dpoEmail.label, value: watched.dpoEmail },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h2 id="form-title" className="text-xl font-semibold tracking-tight text-foreground">
        {formTitle}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{formDescription}</p>

      {result === 'success' ? (
        <div className="mt-6">
          <FormAlert tone="success" title={successTitle} description={successDescription} />

          <div className="mt-6">
            <h3 className="text-base font-semibold text-foreground">
              {FORM_CONTENT.successNextTitle}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {FORM_CONTENT.successNextDescription}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="brand" size="lg">
                <Link to="/documents">
                  <FileText aria-hidden="true" />
                  {FORM_CONTENT.analyzeDocumentLabel}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">
                  <LayoutDashboard aria-hidden="true" />
                  {FORM_CONTENT.dashboardLabel}
                </Link>
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => setResult('idle')}
            >
              {FORM_CONTENT.newSubmissionLabel}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {result === 'error' ? (
            <FormAlert tone="error" title={errorTitle} description={errorDescription} />
          ) : null}

          <ol aria-label={FORM_CONTENT.stepperLabel} className="mt-6 grid grid-cols-3 gap-2">
            {STEPS.map((step, index) => {
              const isCurrent = index === stepIndex
              const isDone = index < stepIndex

              return (
                <li
                  key={step.id}
                  aria-current={isCurrent ? 'step' : undefined}
                  className="flex items-start justify-center gap-2 sm:justify-start"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                      isDone &&
                        'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-300',
                      isCurrent && 'border-blue-600 bg-blue-600 text-white',
                      !isCurrent && !isDone && 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    {isDone ? <Check className="size-3.5" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'sr-only text-sm font-medium sm:not-sr-only',
                        isCurrent ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="sr-only">
                      {isDone ? 'Concluída' : isCurrent ? 'Etapa atual' : 'Pendente'}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>

          <p role="status" className="mt-3 text-xs font-medium text-muted-foreground">
            {FORM_CONTENT.stepLabel
              .replace('{current}', String(stepIndex + 1))
              .replace('{total}', String(STEPS.length))}
          </p>

          <form
            onSubmit={(event) => {
              if (isLastStep) {
                void handleSubmit(onSubmit)(event)
                return
              }

              event.preventDefault()
              void handleNext()
            }}
            noValidate
            aria-busy={isSubmitting}
            aria-labelledby="form-title"
            className="mt-5 space-y-4"
          >
            <div>
              <h3
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-base font-semibold text-foreground focus-visible:outline-none"
              >
                {currentStep.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {currentStep.description}
              </p>
            </div>

            {stepIndex === 0 ? (
              <>
                <FormField
                  label={fields.cnpj.label}
                  error={errors.cnpj?.message}
                  description={fields.cnpj.helpText}
                  required
                >
                  {(field) => (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Controller
                          control={control}
                          name="cnpj"
                          render={({ field: cnpjField }) => (
                            <Input
                              {...field}
                              {...cnpjField}
                              type="text"
                              placeholder={fields.cnpj.placeholder}
                              autoComplete="off"
                              inputMode="numeric"
                              maxLength={18}
                              className={`${inputClasses} flex-1`}
                              onChange={(event) => {
                                setLookupStatus('idle')
                                cnpjField.onChange(formatCnpj(event.target.value))
                              }}
                            />
                          )}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="xl"
                          className="w-full sm:w-auto"
                          onClick={handleCnpjLookup}
                          disabled={lookupStatus === 'loading'}
                        >
                          {lookupStatus === 'loading' ? (
                            <Loader2 aria-hidden="true" className="animate-spin" />
                          ) : (
                            <Search aria-hidden="true" />
                          )}
                          {lookupStatus === 'loading'
                            ? fields.cnpj.lookingUpLabel
                            : fields.cnpj.lookupLabel}
                        </Button>
                      </div>
                      <CnpjLookupStatus status={lookupStatus} />
                    </div>
                  )}
                </FormField>

                <FormField
                  label={fields.url.label}
                  error={errors.url?.message}
                  description={fields.url.helpText}
                  required
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="url"
                      placeholder={fields.url.placeholder}
                      autoComplete={fields.url.autoComplete}
                      inputMode="url"
                      spellCheck={false}
                      className={inputClasses}
                      {...register('url')}
                    />
                  )}
                </FormField>

                <FormField
                  label={fields.empresa.label}
                  error={errors.empresa?.message}
                  description={fields.empresa.helpText}
                  required
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder={fields.empresa.placeholder}
                      autoComplete={fields.empresa.autoComplete}
                      className={inputClasses}
                      {...register('empresa')}
                    />
                  )}
                </FormField>
              </>
            ) : null}

            {stepIndex === 1 ? (
              <>
                <FormField
                  label={fields.email.label}
                  error={errors.email?.message}
                  description={fields.email.helpText}
                  required
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder={fields.email.placeholder}
                      autoComplete={fields.email.autoComplete}
                      spellCheck={false}
                      className={inputClasses}
                      {...register('email')}
                    />
                  )}
                </FormField>

                <FormField
                  label={fields.dpoNome.label}
                  error={errors.dpoNome?.message}
                  description={fields.dpoNome.helpText}
                  required
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder={fields.dpoNome.placeholder}
                      autoComplete={fields.dpoNome.autoComplete}
                      className={inputClasses}
                      {...register('dpoNome')}
                    />
                  )}
                </FormField>

                <FormField
                  label={fields.dpoEmail.label}
                  error={errors.dpoEmail?.message}
                  description={fields.dpoEmail.helpText}
                  required
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder={fields.dpoEmail.placeholder}
                      autoComplete={fields.dpoEmail.autoComplete}
                      spellCheck={false}
                      className={inputClasses}
                      {...register('dpoEmail')}
                    />
                  )}
                </FormField>
              </>
            ) : null}

            {stepIndex === 2 ? (
              <>
                <FormField
                  label={fields.finalidades.label}
                  error={errors.finalidades?.message}
                  description={fields.finalidades.helpText}
                  required
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder={fields.finalidades.placeholder}
                      className={textareaClasses}
                      {...register('finalidades')}
                    />
                  )}
                </FormField>

                <FormField
                  label={fields.documentos.label}
                  error={errors.documentos?.message}
                  description={fields.documentos.helpText}
                  required
                >
                  {(field) => (
                    <div>
                      <input
                        {...field}
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                        onChange={(event) => {
                          setValue('documentos', event.target.files ?? undefined, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }}
                      />

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip aria-hidden="true" />
                          {selectedFiles.length > 0 ? files.replaceLabel : files.attachLabel}
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          {selectedFiles.length > 0
                            ? `${selectedFiles.length} ${
                                selectedFiles.length === 1
                                  ? files.selectedCount
                                  : files.selectedCountPlural
                              }`
                            : files.emptyDescription}
                        </p>
                      </div>

                      <div aria-live="polite" className="mt-3">
                        {selectedFiles.length === 0 ? (
                          <p className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                            {files.emptyTitle}
                          </p>
                        ) : (
                          <ul className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
                            {selectedFiles.map((file) => (
                              <li
                                key={`${file.name}-${file.size}-${file.lastModified}`}
                                className="flex items-center gap-2 text-sm"
                              >
                                <FileText
                                  aria-hidden="true"
                                  className="size-4 shrink-0 text-muted-foreground"
                                />
                                <span className="min-w-0 flex-1 truncate text-foreground">
                                  {file.name}
                                </span>
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {selectedFiles.length > 0 ? (
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {files.replaceNotice} {files.removeHint}
                          </p>
                        ) : null}
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {files.localOnly}
                      </p>
                    </div>
                  )}
                </FormField>

                <FormField
                  label={fields.observacoes.label}
                  error={errors.observacoes?.message}
                  description={fields.observacoes.helpText}
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder={fields.observacoes.placeholder}
                      className={textareaClasses}
                      {...register('observacoes')}
                    />
                  )}
                </FormField>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="text-sm font-semibold text-foreground">
                    {FORM_CONTENT.reviewTitle}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {FORM_CONTENT.reviewDescription}
                  </p>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    {summaryItems.map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-0.5 break-words text-foreground">
                          {item.value?.trim() || FORM_CONTENT.emptyValue}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </>
            ) : null}

            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
              {stepIndex > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
                  disabled={isSubmitting}
                >
                  <ArrowLeft aria-hidden="true" />
                  {FORM_CONTENT.backLabel}
                </Button>
              ) : (
                <span aria-hidden="true" className="hidden sm:block" />
              )}

              {isLastStep ? (
                <Button
                  type="submit"
                  variant="brand"
                  size="xl"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting || lookupStatus === 'loading'}
                >
                  {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
                  {isSubmitting ? submittingLabel : submitLabel}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="brand"
                  size="xl"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    void handleNext()
                  }}
                  disabled={lookupStatus === 'loading'}
                >
                  {FORM_CONTENT.nextLabel}
                  <ArrowRight aria-hidden="true" />
                </Button>
              )}
            </div>
          </form>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{demoNotice}</p>
        </>
      )}

      <p className="mt-3 text-sm text-muted-foreground">
        Já tem uma conta?{' '}
        <Link
          to="/login"
          className="rounded-md font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
        >
          Entrar
        </Link>
        {' · '}
        <Link
          to="/register"
          className="rounded-md font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
        >
          Criar conta
        </Link>
        {' · '}
        <Link
          to="/plans"
          className="rounded-md font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:bg-blue-500/10 dark:focus-visible:ring-blue-400/60"
        >
          Planos
        </Link>
      </p>
    </div>
  )
}
