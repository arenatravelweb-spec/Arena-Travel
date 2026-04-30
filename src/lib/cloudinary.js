const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message ?? 'Error al subir imagen a Cloudinary')
  }

  const data = await res.json()
  return data.secure_url
}

export const VIDEO_MAX_BYTES = 100 * 1024 * 1024 // 100 MB

export async function uploadVideoToCloudinary(file) {
  if (file.size > VIDEO_MAX_BYTES) {
    throw new Error('El video supera el tamaño máximo permitido (100 MB)')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message ?? 'Error al subir video a Cloudinary')
  }

  const data = await res.json()
  return data.secure_url
}
