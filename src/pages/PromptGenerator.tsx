
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Send, X, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ChatBotWidget from "@/components/ChatBotWidget";

// Purpose phrases mapping
const purposePhrases = {
  explain: "Explain",
  create: "Create",
  summarize: "Summarize",
  analyze: "Analyze",
  generate: "Generate ideas for",
  translate: "Translate",
  instruct: "Provide step-by-step instructions for",
  compare: "Compare and contrast",
  roleplay: "Role-play as an expert in",
  other: ""
};

// Format phrases mapping
const formatPhrases = {
  paragraph: "in paragraph format",
  bullet: "as a bullet point list",
  numbered: "as a numbered list",
  table: "organized in a table",
  dialog: "as a dialogue or conversation",
  essay: "in essay format",
  code: "with code examples",
  story: "as a narrative or story",
  json: "in JSON format",
  other: ""
};

// Tone phrases mapping
const tonePhrases = {
  neutral: "using a neutral, objective tone",
  friendly: "in a friendly, conversational style",
  professional: "in a professional, formal manner",
  academic: "in an academic, scholarly style",
  enthusiastic: "with an enthusiastic, energetic tone",
  technical: "using precise, technical language",
  simple: "using simple, easy-to-understand language",
  humorous: "with a light-hearted, humorous tone",
  creative: "with a creative, imaginative approach",
  persuasive: "in a persuasive, convincing manner"
};

// Length phrases mapping
const lengthPhrases = {
  concise: "Keep it concise (1-2 paragraphs).",
  moderate: "Provide moderate detail (3-5 paragraphs).",
  detailed: "Include detailed information (6-8 paragraphs).",
  comprehensive: "Be comprehensive and thorough (9+ paragraphs)."
};

// Audience phrases mapping
const audiencePhrases = {
  general: "for a general audience",
  beginner: "for beginners with no prior knowledge",
  intermediate: "for people with intermediate understanding",
  expert: "for experts and professionals",
  students: "for students",
  children: "for children",
  technical: "for a technical audience",
  business: "for business professionals",
  other: ""
};

const PromptGenerator = () => {
  // Form state
  const [purpose, setPurpose] = useState("explain");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("paragraph");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("moderate");
  const [audience, setAudience] = useState("general");
  const [instructions, setInstructions] = useState("");
  const [aiModel, setAiModel] = useState("GPT-4o");
  
  // Generated prompt and response
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // Update the prompt whenever form values change
  useEffect(() => {
    updatePromptPreview();
  }, [purpose, topic, format, tone, length, audience, instructions]);

  // Generate the prompt text
  const updatePromptPreview = () => {
    const promptTopic = topic.trim() || "[topic]";
    let promptText = "";
    
    // Build context setting
    promptText += "You are an expert providing high-quality information";
    if (audience !== "general") {
      promptText += " " + audiencePhrases[audience];
    }
    promptText += ".\n\n";
    
    // Build main request
    promptText += purposePhrases[purpose] + " " + promptTopic;
    
    // Add format if not "other"
    if (format !== "other") {
      promptText += " " + formatPhrases[format];
    }
    
    // Add tone
    promptText += " " + tonePhrases[tone] + ".";
    
    // Add length requirement
    promptText += " " + lengthPhrases[length];
    
    // Add additional instructions if any
    if (instructions) {
      promptText += "\n\nAdditional requirements:\n" + instructions;
    }
    
    setGeneratedPrompt(promptText);
  };

  // Copy prompt to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Prompt copied to clipboard",
          duration: 2000,
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      });
  };

  // Send prompt to AI
  const handleSend = () => {
    if (!topic || topic.trim() === "" || generatedPrompt.includes("[topic]")) {
      toast({
        title: "Missing Topic",
        description: "Please enter a topic before sending to AI",
        variant: "destructive",
      });
      return;
    }
    
    setIsResponseVisible(true);
    setIsLoading(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      setAiResponse(
        `This is a simulated response to your prompt about "${topic}". In a real implementation, this would be connected to the ${aiModel} API.\n\nYour prompt was:\n${generatedPrompt}\n\nWith a proper API integration, you would receive an actual AI-generated response based on your prompt configuration.`
      );
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          AI Prompt Generator <Sparkles className="h-5 w-5 text-amber-400" />
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Design effective prompts for better AI responses</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prompt Builder Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Prompt Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Purpose Selection */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium mb-1">
                What do you want the AI to do?
              </label>
              <select 
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="explain">Explain a concept</option>
                <option value="create">Create content</option>
                <option value="summarize">Summarize information</option>
                <option value="analyze">Analyze or evaluate</option>
                <option value="generate">Generate ideas</option>
                <option value="translate">Translate content</option>
                <option value="instruct">Give step-by-step instructions</option>
                <option value="compare">Compare and contrast</option>
                <option value="roleplay">Role-play as a character/expert</option>
                <option value="other">Other (specify in additional instructions)</option>
              </select>
            </div>
            
            {/* Topic/Subject */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-1">
                Topic or Subject
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the main topic or subject"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            
            {/* Format Selection */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium mb-1">
                Output Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="paragraph">Paragraphs</option>
                <option value="bullet">Bullet points</option>
                <option value="numbered">Numbered list</option>
                <option value="table">Table</option>
                <option value="dialog">Dialog/Conversation</option>
                <option value="essay">Essay</option>
                <option value="code">Code</option>
                <option value="story">Story/Narrative</option>
                <option value="json">JSON</option>
                <option value="other">Other (specify below)</option>
              </select>
            </div>
            
            {/* Tone Selection */}
            <div>
              <label htmlFor="tone" className="block text-sm font-medium mb-1">
                Tone/Style
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="neutral">Neutral/Objective</option>
                <option value="friendly">Friendly/Conversational</option>
                <option value="professional">Professional/Formal</option>
                <option value="academic">Academic/Scholarly</option>
                <option value="enthusiastic">Enthusiastic/Energetic</option>
                <option value="technical">Technical/Precise</option>
                <option value="simple">Simple/Easy to understand</option>
                <option value="humorous">Humorous/Light-hearted</option>
                <option value="creative">Creative/Imaginative</option>
                <option value="persuasive">Persuasive/Convincing</option>
              </select>
            </div>
            
            {/* Length/Detail Level */}
            <div>
              <label htmlFor="length" className="block text-sm font-medium mb-1">
                Length/Detail Level
              </label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="concise">Concise (1-2 paragraphs)</option>
                <option value="moderate">Moderate (3-5 paragraphs)</option>
                <option value="detailed">Detailed (6-8 paragraphs)</option>
                <option value="comprehensive">Comprehensive (9+ paragraphs)</option>
              </select>
            </div>
            
            {/* Target Audience */}
            <div>
              <label htmlFor="audience" className="block text-sm font-medium mb-1">
                Target Audience
              </label>
              <select
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="general">General audience</option>
                <option value="beginner">Beginners/Novices</option>
                <option value="intermediate">Intermediate level</option>
                <option value="expert">Experts/Professionals</option>
                <option value="students">Students</option>
                <option value="children">Children</option>
                <option value="technical">Technical audience</option>
                <option value="business">Business professionals</option>
                <option value="other">Other (specify below)</option>
              </select>
            </div>
            
            {/* Additional Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium mb-1">
                Additional Instructions or Context (optional)
              </label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Add any specific requirements, constraints, or additional context..."
                className="w-full resize-none"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Preview & Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Generated Prompt</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-600 flex-grow overflow-y-auto max-h-[300px]">
              <p className="whitespace-pre-wrap">{generatedPrompt}</p>
            </div>
            
            {/* Bot Selection & Buttons */}
            <div className="space-y-4">
              <div>
                <label htmlFor="botSelect" className="block text-sm font-medium mb-1">
                  Send to AI Model:
                </label>
                <select
                  id="botSelect"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-base"
                >
                  <option value="Claude-3.7-Sonnet">Claude-3.7-Sonnet</option>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="GPT-4o-mini">GPT-4o-mini</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy Prompt
                </Button>
                <Button
                  onClick={handleSend}
                  className="flex-1"
                >
                  <Send className="mr-2 h-4 w-4" /> Send to AI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-primary">Prompt Engineering Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Be Specific</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Instead of "Write about dogs," try "Explain the differences between Labrador and Golden Retriever breeds in terms of temperament, care needs, and common health issues."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Use Context Setting</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Frame your request with context: "You are an expert marine biologist explaining ocean acidification to high school students who have basic knowledge of chemistry."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Break Down Complex Requests</h3>
              <p className="text-gray-700 dark:text-gray-300">
                For multi-part answers, break them down: "First, explain what quantum computing is. Then, describe its potential applications. Finally, discuss current limitations."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Specify Constraints</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Add limitations when needed: "Provide 5 examples of renewable energy sources and explain each in 2-3 sentences. Do not include nuclear energy in your answer."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Response Display Section */}
      {isResponseVisible && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-primary">AI Response</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsResponseVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 min-h-[200px] max-h-[500px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-primary">Loading response...</div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{aiResponse}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <ChatBotWidget />
    </div>
  );
};

export default PromptGenerator;
