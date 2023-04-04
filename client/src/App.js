import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddHotel from "./pages/AddHotel";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditHotel from "./components/EditHotel";
import SearchResult from "./pages/SearchResult";
import HotelInformation from "./pages/HotelInformation";
import PaymentSuccess from "./pages/PaymentSuccess";

import Practice from "./components/Practice";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hotel-information/:id" element={<HotelInformation />} />
          <Route path="/add-hotel/" element={<AddHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
          <Route path="/become-host" element={<>host</>} />
          <Route path="/orders/:id" element={<>order</>} />
          <Route path="/wishlist/:id" element={<>wishlist</>} />
          <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
