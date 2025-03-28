export const generateCaption = async (input) => {
    try {
        const response = await fetch("https://your-railway-backend-url.up.railway.app/api/generate",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",  // Ensure you're running 'ollama run mistral'
          prompt: `Generate a creative Instagram caption and 5 relevant hashtags about: "${input}".`,
          stream: false,
        }),
      });
  
      if (!response.ok) throw new Error("Ollama API failed");
  
      const data = await response.json();
      const content = data.response.trim();
      const [generatedCaption, generatedHashtags] = content.includes("\n\n")
        ? content.split("\n\n")
        : [content, "#trending #instagram #viral #content #explore"];
  
      return {
        caption: generatedCaption || "Couldn't generate caption.",
        hashtags: generatedHashtags || "#trending #instagram #viral #content #explore",
      };
    } catch (error) {
      console.error("Error:", error);
      return { caption: "Error generating caption", hashtags: "#error #ai #caption" };
    }
  };
  