"use client";

export const dynamic = "force-dynamic";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (err) {
      console.error("login error", err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (err) {
      console.error("logout error", err);
    }
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      {!user ? (
        <button className="primaryButton loginButton" onClick={handleLogin}>
          Login with GitHub
        </button>
      ) : (
        <>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button className="primaryButton logoutButton" onClick={handleLogout}>
            Logout
          </button>
          <div style={{ marginTop: "1rem" }}>
            <button
              className="primaryButton shoppingButton"
              onClick={() => router.push("/week-8/shopping-list")}
            >
              Go to shopping list
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .primaryButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: 2px solid transparent;
          background: #2c3e50;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 160ms ease,
            transform 120ms ease,
            box-shadow 160ms ease,
            border-color 160ms ease;
          text-decoration: none;
          margin: 0.5rem 0;
          min-width: 240px;
        }

        .loginButton {
          background: #0c5dff;
          border-color: #0c5dff;
        }

        .loginButton:hover {
          background: #0048d6;
          border-color: #0048d6;
        }

        .logoutButton {
          background: #c41e3a;
          border-color: #c41e3a;
        }

        .logoutButton:hover {
          background: #a31a34;
          border-color: #a31a34;
        }

        .shoppingButton {
          background: #2c3e50;
          border-color: #2c3e50;
        }

        .shoppingButton:hover {
          background: #1f2a36;
          border-color: #1f2a36;
        }

        .primaryButton:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 22px rgba(0, 0, 0, 0.18);
        }

        .primaryButton:active {
          transform: translateY(0);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.22);
        }
      `}</style>
    </main>
  );
}
