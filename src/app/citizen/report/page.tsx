'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useAppState } from '@/contexts/AppStateContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea, Select } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { citizenService } from '@/services/citizenService'
import type { Category } from '@/types'
import {
  Loader2, UploadCloud, MapPin, Sparkles, X, ImageIcon, AlertCircle
} from 'lucide-react'

const CATEGORIES: Category[] = [
  'Roads', 'Drainage', 'Water', 'Waste',
  'Public Transport', 'Healthcare', 'Education', 'Electricity', 'Other'
]

const MAX_PHOTOS = 3
const MAX_FILE_SIZE_MB = 10

export default function ReportProblem() {
  const router        = useRouter()
  const { user }      = useAuth()
  const { addReport } = useAppState()
  const { showToast } = useToast()

  // ── Form state ─────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category,     setCategory]     = useState<Category>('Roads')
  const [description,  setDescription]  = useState('')
  const [address,      setAddress]      = useState('')
  const [photos,       setPhotos]       = useState<{ file: File; preview: string }[]>([])
  const [dragOver,     setDragOver]     = useState(false)
  const [errors,       setErrors]       = useState({ description: '', address: '', photos: '' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Photo helpers ──────────────────────────────────────────────────────────

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files)
    const remaining = MAX_PHOTOS - photos.length

    if (remaining <= 0) {
      setErrors(e => ({ ...e, photos: `Maximum ${MAX_PHOTOS} photos allowed` }))
      return
    }

    const toAdd: { file: File; preview: string }[] = []
    let photoErr = ''

    for (const file of arr.slice(0, remaining)) {
      if (!file.type.startsWith('image/')) {
        photoErr = 'Only image files are allowed (PNG, JPG, GIF, WebP)'
        continue
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        photoErr = `Each photo must be under ${MAX_FILE_SIZE_MB}MB`
        continue
      }
      toAdd.push({ file, preview: URL.createObjectURL(file) })
    }

    setPhotos(prev => [...prev, ...toAdd])
    setErrors(e => ({ ...e, photos: photoErr }))
  }, [photos.length])

  const removePhoto = (idx: number) => {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
    setErrors(e => ({ ...e, photos: '' }))
  }

  // ── Drag & drop ────────────────────────────────────────────────────────────

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = () => {
    const newErrors = { description: '', address: '', photos: '' }
    let ok = true

    if (!description.trim()) {
      newErrors.description = 'Please describe the issue'
      ok = false
    } else if (description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters'
      ok = false
    }

    if (!address.trim()) {
      newErrors.address = 'Location is required'
      ok = false
    }

    setErrors(newErrors)
    return ok
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Convert local photo previews to base64 data URLs for demo storage
      const imageDataUrls: string[] = await Promise.all(
        photos.map(p => new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload  = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(p.file)
        }))
      )

      const result = await citizenService.submitReport({
        description: description.trim(),
        category,
        images: imageDataUrls,
        location: {
          lat: 28.6139,
          lng: 77.2090,
          address: address.trim(),
          district: 'Demo District',
        },
        userId: user?.id ?? 'USR-1',
        title: `${category} Issue`,
        status: 'Analyzing',
        timestamp: new Date().toISOString(),
      })

      addReport(result)
      showToast('Report submitted successfully! Our AI is now analysing it.', 'success')
      router.push(`/citizen/reports/${result.id}`)
    } catch {
      showToast('Failed to submit report. Please try again.', 'error')
      setIsSubmitting(false)
    }
  }

  // ── Load demo data ─────────────────────────────────────────────────────────

  const loadDemo = () => {
    setDescription('Every time it rains, our road gets flooded. It is impossible to cross the street without getting wet up to the knees. This has been an issue for over 6 months and affects hundreds of commuters daily.')
    setCategory('Drainage')
    setAddress('Main Street near Central Park, Demo District A')
    setErrors({ description: '', address: '', photos: '' })
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Report a Civic Issue</h1>
          <p className="text-slate-500 text-sm mt-1">Help improve your community by reporting problems</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadDemo} className="shrink-0 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary-600" />
          Demo
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Issue Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                options={CATEGORIES.map(c => ({ value: c, label: c }))}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                rows={5}
                placeholder="Describe the issue in detail — what's wrong, how long it's been happening, how many people are affected…"
                value={description}
                onChange={e => { setDescription(e.target.value); setErrors(er => ({ ...er, description: '' })) }}
                error={errors.description}
              />
              <p className="text-xs text-slate-400 mt-1 text-right">{description.length} chars</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter exact address or landmark…"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(er => ({ ...er, address: '' })) }}
                  className={[
                    'w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm placeholder:text-slate-400',
                    'focus:outline-none focus:ring-2 transition-colors',
                    errors.address
                      ? 'border-red-400 focus:ring-red-200 bg-red-50/40'
                      : 'border-slate-300 focus:border-primary-500 focus:ring-primary-200 bg-white',
                  ].join(' ')}
                />
              </div>
              {errors.address && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />{errors.address}
                </p>
              )}
            </div>

            {/* Photo upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Photos <span className="text-slate-400 font-normal">(optional, up to {MAX_PHOTOS})</span>
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }}
              />

              {/* Dropzone */}
              {photos.length < MAX_PHOTOS && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  className={[
                    'relative flex flex-col items-center justify-center gap-2 px-6 py-8',
                    'border-2 border-dashed rounded-xl cursor-pointer transition-all',
                    dragOver
                      ? 'border-primary-500 bg-primary-50 scale-[1.01]'
                      : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-primary-50/40',
                  ].join(' ')}
                >
                  <UploadCloud className={`w-10 h-10 transition-colors ${dragOver ? 'text-primary-500' : 'text-slate-400'}`} />
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-700">
                      <span className="text-primary-600">Click to upload</span> or drag & drop
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, GIF, WebP — max {MAX_FILE_SIZE_MB}MB each</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {MAX_PHOTOS - photos.length} slot{MAX_PHOTOS - photos.length !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              )}

              {errors.photos && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />{errors.photos}
                </p>
              )}

              {/* Photo previews */}
              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {photos.map((p, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.preview}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        aria-label={`Remove photo ${i + 1}`}
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-[10px] truncate flex items-center gap-0.5">
                          <ImageIcon className="w-2.5 h-2.5 shrink-0" />
                          {p.file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Report'}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">
        Reports are processed by our AI engine within minutes · Data is not stored permanently in this demo
      </p>
    </div>
  )
}
