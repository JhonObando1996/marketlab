import { PageShell } from "@/components/marketlab/header";
import { SignUpForm } from "@/components/marketlab/sign-up-form";

export default function SignUpPage() {
  return (
    <PageShell>
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Workshop auth
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your MarketLab account
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Your profile is created automatically with a fake starting balance
            after signup.
          </p>
        </div>
        <SignUpForm />
      </section>
    </PageShell>
  );
}
