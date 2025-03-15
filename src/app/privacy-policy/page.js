import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to our Camera Testing Web App. We are committed to protecting
        your privacy and ensuring that your personal information is secure. This
        privacy policy explains how we collect, use, and protect your
        information when you use our service.
      </p>

      <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
      <p className="mb-4">
        Our app only accesses your camera to provide the service and does not
        store any images or video captured by your device. We do not collect or
        store any personal data related to the use of your camera.
      </p>

      <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        The camera feed is used solely for testing purposes and is not
        transmitted to any external servers. All processing is done locally
        within your browser.
      </p>

      <h2 className="text-2xl font-bold mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We do not share your camera feed or any personal data with third
        parties.
      </p>

      <h2 className="text-2xl font-bold mb-2">Data Security</h2>
      <p className="mb-4">
        We prioritize your privacy and ensure that your data is secure by not
        transmitting it over the internet. Everything is processed locally on
        your device.
      </p>

      <h2 className="text-2xl font-bold mb-2">Your Consent</h2>
      <p className="mb-4">
        By using our camera testing web app, you consent to our privacy policy.
      </p>

      <h2 className="text-2xl font-bold mb-2">Changes to Our Privacy Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. Any changes will be
        posted on this page, and we encourage you to review the policy
        periodically.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
