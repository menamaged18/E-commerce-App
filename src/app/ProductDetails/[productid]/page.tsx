// // page.tsx
// import { use } from 'react';
// import { fetchProductById } from '@/utils/product';
// import PageData from './PageData';

// type props = {
//   params: Promise<{ productid: string }> ;
// }

// // Dynamic metadata
// export async function generateMetadata({ params }: props) {
//   const { productid } = await params;
//   const productId = Number(productid);
//   const product = await fetchProductById(productId);

//   return {
//     title: product?.title || 'Product Not Found',
//     description: product?.description || 'Product details not available',
//   };
// }

// function Page({ params }: props) {
//   const { productid } = use(params);

//   return (
//     <PageData productid={productid} />
//   );
// }

// export default Page;


// app/products/[productid]/page.tsx
import { Metadata } from "next";
import { fetchProductById } from '@/utils/product';
import PageData from "./PageData";

type Props = {
  params: { productid: string };
};

// Runs on the server before rendering the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productid } = await params;
  const productId = Number(productid);
  // Fetch product data
  const product = await fetchProductById(productId);

  return {
    title: `${product?.title} - My Store`,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
    },
  };
}

export default function ProductPage({ params }: Props) {
    return (
      <PageData productid={params.productid} />
  );
}
