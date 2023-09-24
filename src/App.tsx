
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./AppContext";
import Home from "./components/Home/Home";
import { StyledPageContainer } from "./styledComponents/PageContainer";
function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <StyledPageContainer>
        <Home />
      </StyledPageContainer>
    </AppContextProvider>
  );
}

export default App;
