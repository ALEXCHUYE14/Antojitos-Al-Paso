export default {
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'precio',
      title: 'Precio (S/.)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Pollo a la Brasa', value: 'brasa' },
          { title: 'Fast Food', value: 'fastfood' },
          { title: 'Bebidas', value: 'bebidas' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'destacado',
      title: 'Producto destacado',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'precio',
      media: 'imagen',
    },
    prepare(selection: any) {
      const { subtitle } = selection
      return { ...selection, subtitle: `S/. ${subtitle}` }
    },
  },
}
