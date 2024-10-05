"use client"

import { useState, useEffect } from "react"
import { create } from 'zustand'
import { PlusCircle, X, Crosshair, Play, Download } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { toast } from "~/hooks/use-toast"

// Define the store
interface Variable {
  id: string
  name: string
  type: 'textContent' | 'deltaPosition'
  value: number
}

interface GameEditorStore {
  variables: Variable[]
  addVariable: (type: 'textContent' | 'deltaPosition') => void
  removeVariable: (id: string) => void
  updateVariable: (id: string, updates: Partial<Variable>) => void
  isNameUnique: (name: string, currentId: string) => boolean
}

const useGameEditorStore = create<GameEditorStore>((set, get) => ({
  variables: [],
  addVariable: (type) => set((state) => ({
    variables: [...state.variables, { id: Date.now().toString(), name: `New ${type}`, type, value: 0 }]
  })),
  removeVariable: (id) => set((state) => ({
    variables: state.variables.filter(v => v.id !== id)
  })),
  updateVariable: (id, updates) => set((state) => ({
    variables: state.variables.map(v => v.id === id ? { ...v, ...updates } : v)
  })),
  isNameUnique: (name, currentId) => !get().variables.some(v => v.name === name && v.id !== currentId)
}))

enum EditorState {
  LinkInput,
  VariableEditor,
  CodeEditor
}

export function GameEditorComponent() {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.LinkInput)
  const [link, setLink] = useState("")
  const [code, setCode] = useState("// Your game code here\n\nfunction gameLogic() {\n  // Add your game logic\n}\n\n// Start the game\ngameLogic();")
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [backendActions, setBackendActions] = useState<string[]>([])
  const { variables, addVariable, removeVariable, updateVariable, isNameUnique } = useGameEditorStore()

  const handleNameChange = (id: string, newName: string) => {
    if (isNameUnique(newName, id)) {
      updateVariable(id, { name: newName })
    } else {
      toast({
        title: "Name already exists",
        description: "Please choose a unique name for the variable.",
        variant: "destructive",
      })
    }
  }

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (link.trim() === "") {
      toast({
        title: "Invalid Link",
        description: "Please enter a valid link before submitting.",
        variant: "destructive",
      })
      return
    }
    console.log("Link submitted:", link)
    setEditorState(EditorState.VariableEditor)
  }

  const handleBuild = () => {
    console.log("Building with variables:", variables)
    setEditorState(EditorState.CodeEditor)
  }

  const handleCompile = () => {
    console.log("Compiling code:", code)
    toast({
      title: "Code Compiled",
      description: "Your code has been successfully compiled.",
    })
  }

  const handleExport = () => {
    console.log("Exporting code:", code)
    toast({
      title: "Code Exported",
      description: "Your code has been successfully exported.",
    })
    // We're not changing the editor state here, so we stay on the code editor screen
  }

  const handleStartGame = () => {
    setIsGameStarted(!isGameStarted)
  }

  // Simulating backend actions
  useEffect(() => {
    if (!isGameStarted) {
      const interval = setInterval(() => {
        setBackendActions(prev => [...prev, `Action at ${new Date().toLocaleTimeString()}`])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isGameStarted])

  return (
    <div className="flex h-screen bg-[#DCE5DC]">
      <div className="flex-1 p-4 border-r border-[#91A392]">
        <h2 className="text-2xl font-bold mb-4 text-[#4A5759]">Game Screen</h2>
        <div className="bg-white h-[calc(100vh-12rem)] rounded-lg flex flex-col items-center justify-center border-2 border-[#91A392]">
          {isGameStarted ? (
            <iframe src={link} className="w-full h-full rounded-lg" title="Game Content" />
          ) : (
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-2 text-[#4A5759]">Backend Actions</h3>
              <div className="overflow-y-auto h-64 bg-[#F0F4F0] p-2 rounded">
                {backendActions.map((action, index) => (
                  <p key={index} className="text-sm text-[#4A5759]">{action}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={handleStartGame}
          className={`mt-4 w-full ${
            isGameStarted
              ? "bg-[#91A392] hover:bg-[#7A8B7B] text-white"
              : "bg-[#B4C4B4] hover:bg-[#A3B3A3] text-[#4A5759]"
          }`}
        >
          {isGameStarted ? "Stop Game" : "Start Game"}
        </Button>
      </div>
      <div className="w-1/3 p-4 flex flex-col h-screen bg-[#F0F4F0]">
        {editorState === EditorState.LinkInput && (
          <form onSubmit={handleLinkSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-[#4A5759]">Enter Link</h2>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter link here"
              className="mb-4 bg-white border-[#91A392]"
            />
            <Button type="submit" className="bg-[#91A392] hover:bg-[#7A8B7B] text-white">Submit</Button>
          </form>
        )}
        {editorState === EditorState.VariableEditor && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#4A5759]">Variable Editor</h2>
            <div className="flex space-x-2 mb-4">
              <Button onClick={() => addVariable("textContent")} className="bg-[#91A392] hover:bg-[#7A8B7B] text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Text Content
              </Button>
              <Button onClick={() => addVariable("deltaPosition")} className="bg-[#91A392] hover:bg-[#7A8B7B] text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Delta Position
              </Button>
            </div>
            <div className="space-y-4 flex-grow overflow-auto">
              {variables.map((variable) => (
                <div key={variable.id} className="bg-white p-4 rounded-lg border border-[#91A392]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={variable.name}
                        onChange={(e) => handleNameChange(variable.id, e.target.value)}
                        className="font-semibold border-[#91A392]"
                      />
                      <Badge className="bg-[#91A392]">{variable.type}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariable(variable.id)}
                      className="text-[#4A5759] hover:text-[#2D3738]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#4A5759]">Element</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {}}
                      className="w-full border-[#91A392] text-[#4A5759]"
                    >
                      <Crosshair className="mr-2 h-4 w-4" />
                      Pick Element
                    </Button>
                    <Label className="text-[#4A5759]">Value</Label>
                    <Input
                      type="number"
                      value={variable.value}
                      onChange={(e) => updateVariable(variable.id, { value: parseFloat(e.target.value) })}
                      className="bg-[#F0F4F0] border-[#91A392]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={handleBuild} className="mt-4 bg-[#91A392] hover:bg-[#7A8B7B] text-white">Build</Button>
          </div>
        )}
        {editorState === EditorState.CodeEditor && (
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 text-[#4A5759]">Code Editor</h2>
            <div className="flex-grow flex flex-col bg-[#1E1E1E] rounded-lg overflow-hidden">
              <div className="bg-[#252526] p-2 flex justify-between items-center">
                <span className="text-[#CCCCCC]">game.js</span>
                <div className="flex space-x-2">
                  <Button onClick={handleCompile} size="sm" className="bg-[#4D4D4D] hover:bg-[#3D3D3D] text-[#CCCCCC]">
                    <Play className="mr-2 h-4 w-4" />
                    Compile
                  </Button>
                  <Button onClick={handleExport} size="sm" className="bg-[#4D4D4D] hover:bg-[#3D3D3D] text-[#CCCCCC]">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow p-4 bg-[#1E1E1E] text-[#D4D4D4] font-mono text-sm resize-none focus:outline-none"
                style={{ lineHeight: '1.5', tabSize: 2 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}