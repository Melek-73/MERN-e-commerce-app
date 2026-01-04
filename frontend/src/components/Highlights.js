import { ShoppingCart, BadgeCheck, Tag, ShieldCheck } from "lucide-react";

export default function Highlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-8 text-center px-6">
      {/* 1️⃣ Item */}
      <div className="flex flex-col items-center text-center">
        <ShoppingCart className="text-primary w-10 h-10 mb-3" />
        <h4 className="font-semibold text-lg">Free Delivery</h4>
        <p className="text-gray-600 text-sm">
          Enjoy fast and free shipping on all your orders.
        </p>
      </div>

      {/* 2️⃣ Item */}
      <div className="flex flex-col items-center text-center">
        <BadgeCheck className="text-primary w-10 h-10 mb-3" />
        <h4 className="font-semibold text-lg">Quality Guarantee</h4>
        <p className="text-gray-600 text-sm">
          We ensure top quality products for every order.
        </p>
      </div>

      {/* 3️⃣ Item */}
      <div className="flex flex-col items-center text-center">
        <Tag className="text-primary w-10 h-10 mb-3" />
        <h4 className="font-semibold text-lg">Best Prices</h4>
        <p className="text-gray-600 text-sm">
          Get the best deals and exclusive discounts every day.
        </p>
      </div>

      {/* 4️⃣ Item */}
      <div className="flex flex-col items-center text-center">
        <ShieldCheck className="text-primary w-10 h-10 mb-3" />
        <h4 className="font-semibold text-lg">Secure Payment</h4>
        <p className="text-gray-600 text-sm">
          Your transactions are encrypted and safe with us.
        </p>
      </div>
    </div>
  );
}
