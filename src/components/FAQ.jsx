const FAQ = () => {
  const faqList = [
    {
      id: 1,
      title: "What types of products do you offer?",
      text: "We offer a diverse range of household items, including chairs, tables, lighting solutions, bed frames, and more. Our collection is curated to blend style with functionality, ensuring you find the perfect pieces for your home.",
    },
    {
      id: 2,
      title: " How can I place an order?",
      text: "To place an order, simply browse our website, add your desired items to the cart, and proceed to checkout. Follow the easy steps to provide shipping information and payment details. Once your order is confirmed, you'll receive a confirmation email.",
    },
    {
      id: 3,
      title: " Can I modify or cancel my order after it's been placed?",
      text: "Once an order is placed, it enters our processing system to ensure prompt delivery. Therefore, modifications or cancellations may not be possible. Please review your order carefully before confirming the purchase.",
    },
    {
      id: 4,
      title: "Are your products environmentally friendly?",
      text: "We are committed to sustainability. While not all products may be labeled as eco-friendly, we make conscious efforts to source responsibly and reduce our environmental impact. Look for specific product details in the item descriptions for more information.",
    },
    {
      id: 5,
      title: "How do I stay updated on promotions and new arrivals?",
      text: "To stay informed about our latest products and promotions, subscribe to our newsletter. You can find the sign-up option in our website for real-time updates and exclusive offers.",
    },
  ];
  return (
    <div className=" hidden lg:grid">
      <div className=" text-xl md:text-2xl lg:text-3xl font-bold capitalize mt-24 mb-5 text-center">
        Frequently Asked Question
      </div>
      {faqList.map((faq) => {
        const { id, title, text } = faq;
        return (
          <div className="collapse collapse-plus shadow-lg mb-3" key={id}>
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-base md:text-xl font-medium capitalize">
              {title}
            </div>
            <div className="collapse-content border-t border-primary-content">
              <p className=" text-sm md:text-base mt-3">{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
