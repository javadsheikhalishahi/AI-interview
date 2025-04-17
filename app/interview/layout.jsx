import Header from "./_components/Header";

function InterviewLayout({ children }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
         <Header />
      { children }
    </div>
  )
}

export default InterviewLayout;
