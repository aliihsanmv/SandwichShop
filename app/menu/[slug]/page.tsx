

export default function FirstBlog({ params }: { params: { slug: string } }) {
  return <p>Menu Item: {params.slug}</p>
}