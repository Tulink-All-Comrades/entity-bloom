import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy organizations data
const organizations = [
  { id: "1", name: "Cooperative Bank", nature: "Financial Institution" },
  { id: "2", name: "Kenya Women Finance Trust", nature: "MicroFinance Bank" }
];

export default function OrgSelect() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleSelectOrganization = (orgId: string) => {
    localStorage.setItem("selectedOrganization", orgId);
    navigate("/org/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    {/* Logout button with icon */}
    <div className="flex justify-end mb-4">
      <button
        onClick={handleLogout}
        className="flex items-center text-sm text-gray-600 font-medium"
      >
       <LogOut/> {" "} {" "} {" "}
        LogOut
      </button>
    </div>

    {/* Title */}
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Organizations
    </h1>

    {/* Organization list */}
    <ul className="space-y-2">
      {organizations.map((org) => (
        <li
          key={org.id}
          onClick={() => handleSelectOrganization(org.id)}
          className="w-full cursor-pointer p-4 rounded border border-gray-300 hover:bg-gray-100 transition text-gray-800"
        >
          <p className="font-semibold text-base">{org.name}</p>
          <p className="text-sm text-gray-600">{org.nature}</p>
        </li>
      ))}
    </ul>
  </div>
</div>


  );
}