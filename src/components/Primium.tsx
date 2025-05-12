
import { Card, CardContent } from "../components/ui/card";
const plans = [
  {
    title: "Monthly Plan",
    price: "₹199",
    description: "Great for short-term chai lovers.",
  },
  {
    title: "Quarterly Plan",
    price: "₹499",
    description: "Enjoy premium chai for 3 months!",
  },
  {
    title: "Yearly Plan",
    price: "₹1599",
    description: "Best value for regular chai drinkers.",
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join the Premium Chai Club ☕</h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Get exclusive access to premium blends, early deals, free deliveries and more.
        </p>
        <Button className="text-lg px-6 py-3 rounded-2xl">Subscribe Now</Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
        {[
          "Early Access to New Products",
          "Free Delivery on Every Order",
          "Premium Tea Blends Only for Members",
          "Surprise Gifts Every Month",
          "Extra Discounts on Bulk Orders",
          "Priority Customer Support",
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-4 border border-amber-100"
          >
            <p className="text-center font-medium">✅ {feature}</p>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <Card key={idx} className="rounded-2xl border-amber-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold text-amber-600 mb-2">{plan.price}</p>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <Button>Subscribe</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16">
        <h3 className="text-xl font-semibold mb-2">Start sipping like royalty 👑</h3>
        <Button className="text-lg px-6 py-3 rounded-2xl">Join Now</Button>
      </div>
    </div>
  );
}





type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-2xl shadow transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};


