import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/store/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Likelihood, Impact } from '@/types';
import { ChevronLeft } from 'lucide-react';

export default function NewRisk() {
  const navigate = useNavigate();
  const { addRisk } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [likelihood, setLikelihood] = useState<string>('3');
  const [impact, setImpact] = useState<string>('3');
  const [process, setProcess] = useState('');
  const [objective, setObjective] = useState('');
  const [category, setCategory] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    addRisk({
      title,
      description,
      categoryId: 'c1',
      rootCauseId: 'rc1',
      processId: 'p1',
      ownerId: 'u1',
      likelihood: parseInt(likelihood) as Likelihood,
      impact: parseInt(impact) as Impact,
      status: 'Open',
    });
    
    navigate('/risks');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-slate-500" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#1e293b]">Risk Assessment</h2>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Nav */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-slate-200">
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md relative z-10">
               <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 outline outline-4 outline-indigo-50"></div>
               Risk
            </button>
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-md relative z-10">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white group-hover:border-slate-400"></div>
               Control
               <p className="text-[10px] text-slate-400 font-normal absolute left-8 top-7 leading-tight max-w-[120px]">Information about the current risk management controls in place...</p>
            </button>
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-md mt-12 relative z-10">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white"></div>
               Treatment
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="process" className="text-slate-600">Process</Label>
                <Select value={process} onValueChange={setProcess}>
                  <SelectTrigger id="process" className="bg-slate-50/50">
                    <SelectValue placeholder="Select Process" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">Budgeting & Forecasting</SelectItem>
                    <SelectItem value="p2">IT Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective" className="text-slate-600">Objective</Label>
                <Input id="objective" placeholder="Enter objective" className="bg-slate-50/50" value={objective} onChange={e => setObjective(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-600 text-sm">Risk Title <span className="text-red-500">*</span></Label>
              <Input id="title" className="bg-slate-50/50" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-600 text-sm">Risk Description <span className="text-red-500">*</span></Label>
              <Textarea id="description" className="bg-slate-50/50 min-h-[120px]" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <div className="border-t pt-6">
               <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Risk Analysis</h3>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <Label htmlFor="rootCause" className="text-slate-600">Root Cause</Label>
                        <span className="text-xs text-indigo-500 cursor-pointer">Create Using AI</span>
                     </div>
                     <Select>
                        <SelectTrigger className="bg-slate-50/50">
                           <SelectValue placeholder="Select root cause" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="rc1">Inadequate user research</SelectItem>
                           <SelectItem value="rc2">Misalignment in project timelines</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <Label htmlFor="consequences" className="text-slate-600">Risk Consequences</Label>
                        <span className="text-xs text-indigo-500 cursor-pointer">Create Using AI</span>
                     </div>
                     <Select>
                        <SelectTrigger className="bg-slate-50/50">
                           <SelectValue placeholder="Select risk consequences" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="c1">Customer dissatisfaction</SelectItem>
                           <SelectItem value="c2">Project cost overruns</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               
               <div className="space-y-2 mt-6 max-w-sm">
                  <Label htmlFor="category" className="text-slate-600">Risk Category <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-slate-50/50">
                     <SelectValue placeholder="Select risk category" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="cat1">Financial Risk</SelectItem>
                     <SelectItem value="cat2">Operational Risk</SelectItem>
                     <SelectItem value="cat3">Reputational Risk</SelectItem>
                  </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="border-t pt-6">
               <h3 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Risk Assessment</h3>
               
               <div className="bg-indigo-50/30 p-6 rounded-lg border border-indigo-100 grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-8">
                     <div className="space-y-2 relative">
                        <Label className="text-slate-700">Overall Likelihood</Label>
                        <input type="range" min="1" max="5" value={likelihood} onChange={(e) => setLikelihood(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-2">
                           <span>Rare</span>
                           <span>Unlikely</span>
                           <span>Possible</span>
                           <span>Likely</span>
                           <span>Almost Certain</span>
                        </div>
                     </div>
                     <div className="space-y-2 relative">
                        <Label className="text-slate-700">Overall Impact</Label>
                        <input type="range" min="1" max="5" value={impact} onChange={(e) => setImpact(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-2">
                           <span>Insignificant</span>
                           <span>Minor</span>
                           <span>Moderate</span>
                           <span>Major</span>
                           <span>Catastrophic</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center bg-white rounded-md p-4 shadow-sm border border-slate-100">
                     <h4 className="text-sm font-medium text-slate-500 mb-4">Inherent Risk Rating</h4>
                     <div className="w-24 h-12 overflow-hidden relative">
                         <div className="w-24 h-24 rounded-full border-[12px] border-slate-100 border-b-transparent border-r-transparent rotate-45"></div>
                         <div className="w-24 h-24 rounded-full border-[12px] border-yellow-400 border-b-transparent border-r-transparent rotate-45 absolute top-0 left-0" style={{ transform: `rotate(${parseInt(likelihood)*parseInt(impact) * 3}deg)`}}></div>
                     </div>
                     <span className="mt-2 font-semibold text-yellow-500">Medium</span>
                  </div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>Save as draft</Button>
              <Button type="submit" className="bg-[#1e293b]">Submit Risk for Approval</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
