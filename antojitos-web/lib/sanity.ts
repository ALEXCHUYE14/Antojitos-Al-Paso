import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'TU_PROJECT_ID'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Función para obtener productos por categoría
export async function getProductosPorCategoria(categoria: string) {
  return client.fetch(
    `*[_type == "producto" && categoria == $categoria && disponible == true] | order(orden asc)`,
    { categoria }
  )
}

// Función para obtener todos los productos disponibles
export async function getTodosProductos() {
  return client.fetch(
    `*[_type == "producto" && disponible == true] | order(categoria, orden asc)`
  )
}
