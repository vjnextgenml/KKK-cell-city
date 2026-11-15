import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { formatINR, products } from "../data/products";
import { accessoryProducts } from "./Pages";

type StoreProps = {
  cartCount: number;
};

function ProductImageFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center text-slate-500">
      <ImageOff size={28} strokeWidth={1.5} aria-hidden="true" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

export default function ProductDetails({ cartCount }: StoreProps) {
  const { productId } = useParams();
  const product =
    products.find((item) => item.id === productId) ??
    accessoryProducts.find((item) => item.id === productId);
  const recommendedProducts = products
    .filter((item) => item.productType === "mobile" && item.id !== productId)
    .slice(0, 5);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImageIndexes, setFailedImageIndexes] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setFailedImageIndexes(new Set());
  }, [productId]);

  if (!product) {
    return (
      <div className="light-theme flex min-h-screen flex-col bg-ink text-slate-200">
        <Navbar cartCount={cartCount} />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <p className="text-sm font-semibold text-blue-600">Product not found</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            We couldn’t find that product.
          </h1>
          <Link
            to="/shop"
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Back to shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images;
  const activeImage = images[activeImageIndex] ?? null;
  const activeImageUnavailable =
    !activeImage || failedImageIndexes.has(activeImageIndex);
  const specifications = Object.entries(product.specifications).filter(
    ([, value]) => value.trim().length > 0,
  );
  const mobileSpecifications =
    product.productType === "mobile"
      ? specifications.filter(
          ([label]) =>
            !["storage", "storage (gb)", "internal storage", "colour", "color"].includes(
              label.trim().toLowerCase(),
            ),
        )
      : specifications;
  const discountPercent =
    product.listPrice && product.listPrice > product.price
      ? Math.round((1 - product.price / product.listPrice) * 100)
      : null;

  function markImageUnavailable(index: number) {
    setFailedImageIndexes((failed) => new Set(failed).add(index));
  }

  function showImage(index: number) {
    setActiveImageIndex((index + images.length) % images.length);
  }

  return (
    <div className="light-theme product-details-page min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      <main className="product-details-main mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="product-details-back inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <ChevronLeft size={17} aria-hidden="true" />
          Back to shop
        </Link>

        <div className="product-details-layout mt-6">
          <section
            aria-label="Product images"
            className={`product-detail-gallery min-w-0 ${
              product.productType === "mobile" ? "mobile-product-gallery" : ""
            }`}
          >
            <div className="product-detail-image-frame relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
              <div className="product-detail-image-stage overflow-hidden rounded-xl bg-slate-50">
                {activeImageUnavailable ? (
                  <ProductImageFallback
                    label={`Image ${activeImageIndex + 1} is not available yet`}
                  />
                ) : (
                  <img
                    key={`${product.id}-${activeImageIndex}`}
                    src={activeImage}
                    alt={`${product.name}, image ${activeImageIndex + 1}`}
                    className="product-detail-image h-full w-full object-contain"
                    onError={() => markImageUnavailable(activeImageIndex)}
                  />
                )}
              </div>

              {product.productType === "mobile" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      showImage(
                        (activeImageIndex - 1 + images.length) % images.length,
                      )
                    }
                    aria-label="Show previous product image"
                    className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showImage(activeImageIndex + 1)}
                    aria-label="Show next product image"
                    className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {product.productType === "mobile" && (
              <div className="product-detail-thumbnails" aria-label="Product image thumbnails">
                {images.map((image, index) => {
                  const imageUnavailable =
                    !image || failedImageIndexes.has(index);

                  return (
                    <button
                      key={`${product.id}-image-${index}`}
                      type="button"
                      onClick={() => showImage(index)}
                      aria-label={
                        imageUnavailable
                          ? `Show image ${index + 1}, not available yet`
                          : `Show product image ${index + 1}`
                      }
                      aria-pressed={activeImageIndex === index}
                      className={`product-detail-thumbnail overflow-hidden rounded-xl border bg-white p-1 transition focus-visible:outline sm:p-2 ${
                        activeImageIndex === index
                          ? "border-blue-600 ring-2 ring-blue-600/20"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      {imageUnavailable ? (
                        <span className="flex h-full flex-col items-center justify-center gap-1 bg-slate-50 text-[10px] font-medium text-slate-500 sm:text-xs">
                          <ImageOff size={16} aria-hidden="true" />
                          Image {index + 1} unavailable
                        </span>
                      ) : (
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-contain"
                          onError={() => markImageUnavailable(index)}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="product-detail-info min-w-0">
            {product.productType !== "mobile" && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                {product.category ?? product.productType}
              </p>
            )}
            <h1 className="product-detail-name mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">
              {product.name}
            </h1>
            {product.productType !== "mobile" && (
              <p className="mt-2 text-sm font-medium text-slate-500">
                {product.brand}
              </p>
            )}

            <div className="product-detail-price mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-2xl font-bold text-slate-900">
                {formatINR(product.price)}
              </span>
              {product.listPrice !== undefined && (
                <span className="text-sm text-slate-500 line-through">
                  {formatINR(product.listPrice)}
                </span>
              )}
              {discountPercent !== null && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {discountPercent}% off
                </span>
              )}
            </div>

            {product.availability && (
              <p className="mt-4 text-sm font-medium text-slate-700">
                {product.availability}
              </p>
            )}

            {product.productType === "mobile" ? (
              <div className="product-variant-details">
                <section aria-labelledby="storage-heading">
                  <h2 id="storage-heading">Storage (GB)</h2>
                  {product.storageOptions?.length ? (
                    <ul>
                      {product.storageOptions.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not provided in the current product data.</p>
                  )}
                </section>

                <section aria-labelledby="colours-heading">
                  <h2 id="colours-heading">Colours</h2>
                  {product.availableColours?.length ? (
                    <ul>
                      {product.availableColours.map((colour) => (
                        <li key={colour}>{colour}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not provided in the current product data.</p>
                  )}
                </section>

                <section
                  aria-labelledby="product-specifications-heading"
                >
                  <h2 id="product-specifications-heading">
                    Mobile Specifications
                  </h2>
                  {mobileSpecifications.length ? (
                    <dl>
                      {mobileSpecifications.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p>Not provided in the current product data.</p>
                  )}
                </section>
              </div>
            ) : (
              <section
                aria-labelledby="product-specifications-heading"
                className="product-detail-specifications mt-8 border-t border-slate-200 pt-6"
              >
                <h2
                  id="product-specifications-heading"
                  className="text-lg font-semibold text-slate-900"
                >
                  Specifications
                </h2>
                {specifications.length ? (
                  <dl className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {specifications.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-4"
                    >
                      <dt className="text-sm font-medium text-slate-500">
                        {label}
                      </dt>
                      <dd className="min-w-0 text-sm text-slate-800">
                        {value}
                      </dd>
                    </div>
                  ))}
                  </dl>
                ) : (
                  <p className="mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                    Verified specifications have not been provided for this
                    product yet.
                  </p>
                )}
              </section>
            )}
          </section>
        </div>

        <section
          className="product-recommendations"
          aria-labelledby="product-recommendations-heading"
        >
          <h2
            id="product-recommendations-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            You May Also Like
          </h2>
          <div className="product-recommendation-row">
            {recommendedProducts.map((recommendedProduct) => (
              <ProductCard
                key={recommendedProduct.id}
                product={recommendedProduct}
                compact
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
