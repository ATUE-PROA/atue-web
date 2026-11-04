import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, FileText, Loader2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FORM_CONTENT } from '@/content/form'
import { formatCnpj, normalizeCnpj } from '@/lib/cnpj'
import { formSchema } from '@/lib/form'
import { lookupCnpj } from '@/services/cnpj'
import { submitForm } from '@/services/form'
import type { FormValues } from '@/types/form.types'

type SubmissionResult = 'idle' | 'success' | 'error'
type LookupStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const textareaClasses =
  'min-h-24 resize-y rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const fileInputClasses =
  'h-auto cursor-pointer rounded-lg border-input py-2 text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/80 focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const {
  formTitle,
  formDescription,
  fields,
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
  const [result, setResult] = useState<SubmissionResult>('idle')
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>('idle')

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
      documentos: undefined,
      observacoes: '',
    },
  })

  const documentos = useWatch({ control, name: 'documentos' })
  const selectedFiles = documentos ? Array.from(documentos) : []

  const onSubmit = async (values: FormValues) => {
    if (lookupStatus === 'loading') {
      return
    }

    setResult('idle')

    try {
      await submitForm(values)
      reset()
      setResult('success')
    } catch {
      setResult('error')
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

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-2xl dark:shadow-black/30">
      <h2 id="form-title" className="text-xl font-semibold tracking-tight text-foreground">
        {formTitle}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{formDescription}</p>

      {result === 'success' ? (
        <FormAlert tone="success" title={successTitle} description={successDescription} />
      ) : null}

      {result === 'error' ? (
        <FormAlert tone="error" title={errorTitle} description={errorDescription} />
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isSubmitting}
        aria-labelledby="form-title"
        className="mt-6 space-y-4"
      >
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

        <FormField label={fields.empresa.label} error={errors.empresa?.message} required>
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

        <FormField label={fields.email.label} error={errors.email?.message} required>
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
          label={fields.documentos.label}
          error={errors.documentos?.message}
          description={fields.documentos.helpText}
          required
        >
          {(field) => (
            <div className="space-y-2">
              <Input
                {...field}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className={fileInputClasses}
                {...register('documentos')}
              />

              <div aria-live="polite">
                {selectedFiles.length > 0 ? (
                  <ul className="space-y-1 rounded-lg border border-border bg-muted/40 p-3">
                    {selectedFiles.map((file) => (
                      <li
                        key={`${file.name}-${file.size}`}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <FileText aria-hidden="true" className="size-4 shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
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
              rows={4}
              placeholder={fields.observacoes.placeholder}
              className={textareaClasses}
              {...register('observacoes')}
            />
          )}
        </FormField>

        <Button
          type="submit"
          variant="brand"
          size="xl"
          className="w-full"
          disabled={isSubmitting || lookupStatus === 'loading'}
        >
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </form>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{demoNotice}</p>
    </div>
  )
}
