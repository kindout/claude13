import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email et mot de passe obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      toast.success("Connecté ✅");
      navigate("/boards");
    } catch (err: any) {
      // ✅ Affiche l'erreur complète dans la console (très utile)
      console.log("LOGIN ERROR =>", err?.response?.data || err);

      // ✅ Message clair (Strapi renvoie souvent error.message)
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message || // fallback (selon version/shape)
        err?.message ||
        "Erreur réseau (serveur off / CORS / URL)";

      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1 className="auth-title">Connexion</h1>

        <form onSubmit={onSubmit} className="form">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <Button isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="auth-link">
          Pas de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}