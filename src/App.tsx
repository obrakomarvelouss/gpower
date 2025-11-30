import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import { supabase, getSessionId } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [productSlug, setProductSlug] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('session_id', sessionId);

    if (!error && data) {
      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  };

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page);
    setProductSlug(slug || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'explore':
        return <ExplorePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'product':
        return (
          <ProductDetailPage
            productSlug={productSlug || ''}
            onNavigate={handleNavigate}
            onCartUpdate={loadCartCount}
          />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} onCartUpdate={loadCartCount} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} cartCount={cartCount} />
      <div className="pt-16">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default App;
