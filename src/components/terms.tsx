

const TermsPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Terms and Conditions</h1>
      <p className="text-lg">
        Welcome to Chai-Chai! These terms and conditions outline the rules and regulations for the use of our website, services, and products. By using this website, you accept these terms.
      </p>
      <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
      <p>
        These terms govern your access to and use of our website, as well as any products or services available through our website. By using this site, you agree to comply with these terms.
      </p>
      <h2 className="text-xl font-semibold mt-6">2. Use of the Website</h2>
      <p> 
        You must use this website in accordance with all applicable laws and regulations. You may not use the website for any illegal or unauthorized purposes.
      </p>
      {/* Add more sections based on your platform's policies */}
      <h2 className="text-xl font-semibold mt-6">3. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. You will be notified of any significant changes, and your continued use of the website signifies your acceptance of those changes. 
      </p>
    </div>
  );
};

export default TermsPage;
