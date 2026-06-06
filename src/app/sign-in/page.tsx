import { PageShell } from "@/components/marketlab/header";
import { SignInForm } from "@/components/marketlab/sign-in-form";

export default function SignInPage() {
  return (
    <PageShell>
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Workshop auth
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in to MarketLab
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Access your fake-money balance and get ready for trading in later
            workshop steps.
          </p>
        </div>
        <SignInForm />
      </section>
    </PageShell>
  );
}
