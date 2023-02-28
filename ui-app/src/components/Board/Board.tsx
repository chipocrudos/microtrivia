import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TriviaProvider } from "./TriviaContext";

export function Board() {
  return (
    <TriviaProvider>
      <div className="rainbow screen">
        <Header />
        <Content />
        <Footer />
      </div>
    </TriviaProvider>
  );
}
