
function Profile() {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-[Playfair_Display] text-center mb-6">Your Profile</h2>
        <div className="max-w-xl mx-auto">
          <div className="mb-4">
            <p className="font-semibold">Name:</p>
            <p className="text-gray-600">Jane Doe</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Email:</p>
            <p className="text-gray-600">jane@example.com</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Order History:</p>
            <div className="p-4 bg-white rounded-xl shadow-sm">#1234 - Hydrating Serum - $45</div>
          </div>
        </div>
      </div>
    );
  }

export default Profile;