import { useEffect, useState } from 'react';
import { supabase, getSessionId } from '../lib/supabase';
import { Product } from '../types';
import { ShoppingCart, Check, Package, Shield, TrendingUp, ArrowLeft } from 'lucide-react';

interface ProductDetailPageProps {
  productSlug: string;
  onNavigate: (page: string, productSlug?: string) => void;
  onCartUpdate: () => void;
}

export default function ProductDetailPage({
  productSlug,
  onNavigate,
  onCartUpdate,
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productSlug]);

  const loadProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .maybeSingle();

    if (!error && data) {
      setProduct(data);
      loadRelatedProducts(data.category, data.id);
    }
    setLoading(false);
  };

  const loadRelatedProducts = async (category: string, currentId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', currentId)
      .limit(4);

    if (!error && data) {
      setRelatedProducts(data);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    const sessionId = getSessionId();

    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', product.id)
      .maybeSingle();

    if (existingItem) {
      await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1, updated_at: new Date().toISOString() })
        .eq('id', existingItem.id);
    } else {
      await supabase.from('cart_items').insert({
        session_id: sessionId,
        product_id: product.id,
        quantity: 1,
      });
    }

    setAddingToCart(false);
    setAdded(true);
    onCartUpdate();

    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category.replace('-', ' ')}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="text-4xl font-bold text-green-600 mb-6">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.full_description}
              </p>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart || added || product.stock === 0}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>Added to Cart!</span>
                  </>
                ) : product.stock === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span>{addingToCart ? 'Adding...' : 'Add to Cart'}</span>
                  </>
                )}
              </button>

              {product.stock > 0 && product.stock < 10 && (
                <p className="text-orange-600 font-semibold mt-4 text-center">
                  Only {product.stock} left in stock - order soon!
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Warranty Included</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Expert Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigate('product', relatedProduct.slug)}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image_url}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-bold text-green-600">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
