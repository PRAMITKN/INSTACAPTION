export const generateCaption = async (input) => {
    try {
      const response = await fetch("https://instacaption-production.up.railway.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          prompt: `Generate a creative Instagram caption and 5 relevant hashtags about: ${input}.\n\nSeparate caption and hashtags with two newlines.`,
          stream: false,
        }),
      });
  
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const content = data.response.trim();
      const [generatedCaption, generatedHashtags] = content.split("\n\n");

      return {
        caption: generatedCaption || "Couldn't generate caption.",
        hashtags: generatedHashtags || "#social #trending #viral #instagram #content",
      };
    } catch (error) {
      console.error("Error:", error);
      return { caption: "Error generating caption", hashtags: "#error #ai #caption" };
    }
  };
