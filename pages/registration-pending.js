// pages/registration-pending.js
import Layout from '../components/Layout';

export default function RegistrationPending() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="p-8 bg-gray-100 rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Registration Pending Approval
          </h1>
          <p className="text-center">
            Thank you for registering! Your registration request is now pending
            approval from the admin. You will be notified once your account is
            approved.
          </p>
        </div>
      </div>
    </Layout>
  );
}
