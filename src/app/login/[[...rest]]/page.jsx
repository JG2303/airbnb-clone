'use client';

import Modal from "@/app/components/modals/modal";
import { SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpPage() {
  const [mostrarModal, setMostrarModal] = useState()
  
  return (
    <Modal onClose={()=>setMostrarModal}>
      <div className="flex items-center justify-center min-h-screen">
      <SignUp
          appearance={{
          elements: {
            card: "shadow-xl border border-gray-300", // Estilo opcional
          },
        }}
      />
    </div>
    </Modal>
  );
}
