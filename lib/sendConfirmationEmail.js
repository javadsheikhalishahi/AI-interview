export const sendConfirmationEmail = async (email, selectedPlan) => {
    try {
      const res = await fetch("/api/send-subscription-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, selectedPlan }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to send confirmation email");
      }
  
      return await res.json();
    } catch (error) {
      console.error("Email Error:", error);
    }
  };
  