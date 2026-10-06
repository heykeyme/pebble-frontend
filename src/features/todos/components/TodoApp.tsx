"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ScreenState, TodoItem, TodoStatus } from "../types/todo";
import { ScreenSignUp } from "./ScreenSignUp";
import { ScreenVerify } from "./ScreenVerify";
import { ScreenLogin } from "./ScreenLogin";
import { ScreenDashboard } from "./ScreenDashboard";
import { TodoModal } from "./TodoModal";

const INITIAL_ITEMS: TodoItem[] = [
  {
    id: 1,
    title: "Plan weekend trip",
    description: "Look up train times and book the cabin for Saturday.",
    status: "incomplete",
  },
  {
    id: 2,
    title: "Finish reading — Chapter 6",
    description: "Notes on the garden metaphor, for book club discussion.",
    status: "incomplete",
  },
  {
    id: 3,
    title: "Call the dentist",
    description: "Reschedule the cleaning appointment to next month.",
    status: "complete",
  },
  {
    id: 4,
    title: "Water the plants",
    description: "Especially the fern by the window.",
    status: "complete",
  },
];

export function TodoApp() {
  const [screen, setScreen] = useState<ScreenState>("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [resendLabel, setResendLabel] = useState("Resend email");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState(false);

  const [items, setItems] = useState<TodoItem[]>(INITIAL_ITEMS);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<TodoStatus>("incomplete");

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyCode("");
    setVerifyError(false);
    setScreen("verify");
  };

  const handleResend = () => {
    setResendLabel("Sent ✓");
    setVerifyCode("");
    setVerifyError(false);
    window.setTimeout(() => setResendLabel("Resend email"), 2500);
  };

  const handleVerifySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyCode === "0000") {
      setVerifyError(true);
    } else {
      setVerifyError(false);
      setScreen("login");
    }
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const unverified = loginEmail.trim().toLowerCase().includes("unverified");
    if (unverified) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setScreen("dashboard");
    }
  };

  const handleLogout = () => {
    setScreen("login");
    setLoginEmail("");
    setLoginPassword("");
    setLoginError(false);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormTitle("");
    setFormDescription("");
    setFormStatus("incomplete");
    setModalOpen(true);
  };

  const openEditModal = (item: TodoItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormStatus(item.status);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSaveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = formTitle.trim();
    if (!title) return;

    if (editingId != null) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, title, description: formDescription, status: formStatus }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        { id: Date.now(), title, description: formDescription, status: formStatus },
      ]);
    }
    setModalOpen(false);
  };

  const handleToggle = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "complete" ? "incomplete" : "complete" }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#F5F1E4] text-[#141414]">
      {screen === "signup" && (
        <ScreenSignUp
          email={email}
          password={password}
          onEmailChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onSubmit={handleSignupSubmit}
          onGoToLogin={() => setScreen("login")}
        />
      )}

      {screen === "verify" && (
        <ScreenVerify
          email={email || "you@example.com"}
          code={verifyCode}
          error={verifyError}
          resendLabel={resendLabel}
          onCodeChange={setVerifyCode}
          onSubmit={handleVerifySubmit}
          onResend={handleResend}
          onGoToLogin={() => setScreen("login")}
        />
      )}

      {screen === "login" && (
        <ScreenLogin
          loginEmail={loginEmail}
          loginPassword={loginPassword}
          loginError={loginError}
          onLoginEmailChange={(e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
          onLoginPasswordChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLoginPassword(e.target.value)
          }
          onSubmit={handleLoginSubmit}
          onGoToSignup={() => setScreen("signup")}
          onResend={handleResend}
        />
      )}

      {screen === "dashboard" && (
        <ScreenDashboard
          items={items}
          onOpenCreate={openCreateModal}
          onToggle={handleToggle}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onLogout={handleLogout}
        />
      )}

      {modalOpen && (
        <TodoModal
          heading={editingId != null ? "Edit item" : "New item"}
          formTitle={formTitle}
          formDescription={formDescription}
          formStatus={formStatus}
          onTitleChange={(e: ChangeEvent<HTMLInputElement>) => setFormTitle(e.target.value)}
          onDescriptionChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormDescription(e.target.value)
          }
          onStatusChange={setFormStatus}
          onCancel={closeModal}
          onSubmit={handleSaveItem}
        />
      )}
    </div>
  );
}
