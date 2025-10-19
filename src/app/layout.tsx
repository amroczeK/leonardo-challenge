import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ApolloProvider } from "@/components/providers/apollo-provider";
import MainContainer from "@/components/layout/main-container";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { UserProfileProvider } from "@/features/profile/context/profile-context";

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
  description: "Browse and explore characters from the Rick and Morty universe",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-col min-h-svh">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloProvider>
              <UserProfileProvider>
                <Header />
                <MainContainer>{children}</MainContainer>
                <Footer />
              </UserProfileProvider>
            </ApolloProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
