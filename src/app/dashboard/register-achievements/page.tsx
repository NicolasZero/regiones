"use client"
import FormActivities from "@/components/form-activities";
import ProtectedRoute from "@/components/protected-route";

export default function Page() {

  return (
    <ProtectedRoute>
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Registro de logro</h1>
      <FormActivities />
    </div>
    </ProtectedRoute>
  );
}
