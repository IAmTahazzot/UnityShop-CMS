import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { ProductForm } from "../new/components/ProductForm";

const EditProductPage = async ({ params }: { params: { shopUrl: string; productId: string}}) => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="h-screen flex justify-center bg-neutral-50">
        <div className="w-[90%] md:w-[500px] self-start  p-4 my-4 text-neutral-800 border bg-white">
          <h3 className="mb-3 font-bold">Unauthorized access!</h3>
          <p className="text-xs">
            Sign in to access your store.
          </p>
          <Link href="/sign-in">
            <a>
              <Button>Sign in</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const store = await db.store.findFirst({
    where: {
      userId: user.id,
      storeUrl: params.shopUrl,
    }
  })

  if (!store) {
    return (
      <div className="h-screen flex justify-center bg-neutral-50">
        <div className="w-[90%] md:w-[500px] self-start  p-4 my-4 text-neutral-800 border bg-white">
          <h3 className="mb-3 font-bold">No store found.</h3>
          <p className="text-xs">
            You don&apos;t have a store with the url <strong>{params.shopUrl}</strong>.
          </p>
          <Link href='/'>
            <Button variant={'default'} size={'sm'} className='mt-4'>
              Go to home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // getting categories, products and variants
  const categories = await db.category.findMany({
    where: {
      storeUrl: params.shopUrl,
    },
  });

  const product = await db.product.findFirst({
    where: {
      storeId: store.storeId,
      productId: parseInt(params.productId),
    },
    include: {
      variants: true,
      images: true, 
    }
  });

  return (
    <div>
      <ProductForm
        categories={categories}
        storeId={store.storeId}
        userId={user.id}
        product={product}
        />
    </div>
  )
}

export default EditProductPage