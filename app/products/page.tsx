import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';
import { ProductCard } from '../../components/products/ProductCard';
import { initialProducts } from '@/components/data/productData';
export default function Product() {


    return (
        <>
            <NavBar />
            <div className='flex flex-wrap w-4/5 mx-auto'>
                {initialProducts.map((product) => (
                    <div key={product.id} className='flex'>
                        <ProductCard  product={product} />
                    </div>
                ))}
            </div>

            
            <Footer />
        </>
    )
}