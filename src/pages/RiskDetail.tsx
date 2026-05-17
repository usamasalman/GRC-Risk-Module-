import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/store/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRiskScore, getRiskLevel } from '@/lib/risk-utils';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function RiskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { risks, controls, riskControlMappings, treatmentPlans } = useData();
  const [activeTab, setActiveTab] = useState('risk');
  
  const risk = risks.find(r => r.id === id);

  if (!risk) {
    return <div>Risk not found</div>;
  }

  const score = getRiskScore(risk.likelihood, risk.impact);
  const level = getRiskLevel(score);

  const mappedControls = riskControlMappings
    .filter(m => m.riskId === risk.id)
    .map(m => ({
      mapping: m,
      control: controls.find(c => c.id === m.controlId)!
    }));

  const avgEffectiveness = mappedControls.length > 0 
    ? mappedControls.reduce((sum, mc) => sum + ((mc.control?.designEffectiveness || 0 + mc.control?.operatingEffectiveness || 0) / 2) * mc.mapping.weight, 0) / mappedControls.reduce((sum, mc) => sum + mc.mapping.weight, 0)
    : 0;
  
  const residualScore = Math.max(1, Math.round(score * (1 - (avgEffectiveness))));
  const residualLevel = getRiskLevel(residualScore);

  const mappedTreatments = treatmentPlans.filter(t => t.riskId === risk.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
       <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-slate-500" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>

      <div className="flex justify-between items-center bg-white rounded-t-md border-b pb-4 px-6 pt-6">
        <div>
           <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">{risk.title}</h2>
           </div>
           <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">{risk.code}</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">Control</Badge>
           </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">Edit</Button>
           <Button size="sm" className="bg-[#1e293b]">Create Task</Button>
        </div>
      </div>

      <Card className="rounded-none border-x-0 border-y shadow-none bg-slate-50/50">
         <CardContent className="py-6 flex justify-between items-center relative before:absolute before:top-1/2 before:left-12 before:right-12 before:-z-10 before:h-0.5 before:bg-slate-200">
            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
               <div className="w-4 h-4 rounded-full bg-slate-300"></div>
               <span className="text-xs font-semibold text-slate-700">Risk</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
               <div className="w-4 h-4 rounded-full bg-indigo-600 outline outline-4 outline-indigo-100"></div>
               <span className="text-xs font-semibold text-slate-700">Control</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
               <div className="w-4 h-4 rounded-full bg-slate-300"></div>
               <span className="text-xs font-semibold text-slate-400">Treatment</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
               <div className="w-4 h-4 rounded-full bg-slate-300"></div>
               <span className="text-xs font-semibold text-slate-400">Monitoring</span>
            </div>
         </CardContent>
      </Card>

      <div className="flex items-center gap-2 bg-slate-100 p-1 w-max rounded-md mx-6">
         <button onClick={() => setActiveTab('risk')} className={cn("px-4 py-1.5 text-sm font-medium rounded-sm transition-colors", activeTab === 'risk' ? "bg-white text-slate-900 shadow" : "text-slate-600 hover:text-slate-900")}>Risk</button>
         <button onClick={() => setActiveTab('control')} className={cn("px-4 py-1.5 text-sm font-medium rounded-sm transition-colors", activeTab === 'control' ? "bg-[#1e293b] text-white shadow" : "text-slate-600 hover:text-slate-900")}>Control</button>
         <button onClick={() => setActiveTab('treatment')} className={cn("px-4 py-1.5 text-sm font-medium rounded-sm transition-colors", activeTab === 'treatment' ? "bg-[#1e293b] text-white shadow" : "text-slate-600 hover:text-slate-900")}>Treatment</button>
      </div>

      <div className="px-6">
         {activeTab === 'risk' && (
            <div className="space-y-6">
               <div className="border rounded-md divide-y bg-white">
                  <div className="px-4 py-2 bg-slate-50">
                     <h4 className="text-xs font-semibold uppercase text-slate-500">Risk Identification</h4>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-y-4">
                     <div>
                        <p className="text-xs text-slate-500 border-b pb-1 mb-2">Division</p>
                        <p className="text-sm font-medium">ABC Limited</p>
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 border-b pb-1 mb-2">Department</p>
                        <p className="text-sm font-medium">Financial Planning & Analysis</p>
                     </div>
                     <div className="col-span-2">
                        <p className="text-xs text-slate-500 border-b pb-1 mb-2">Risk Owner</p>
                        <div className="flex gap-2">
                           <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600 border border-slate-200">Muhammad Ali Zameli</Badge>
                           <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600 border border-slate-200">Junaid Ahmed</Badge>
                        </div>
                     </div>
                     <div className="col-span-2">
                        <p className="text-xs text-slate-500 border-b pb-1 mb-2">Risk Description</p>
                        <p className="text-sm">{risk.description}</p>
                     </div>
                  </div>
               </div>

               <div className="border rounded-md divide-y bg-white">
                  <div className="bg-rose-50/30 p-6 flex flex-col items-center justify-center border-b">
                     <h4 className="text-sm font-medium text-slate-500 mb-4">Inherent Risk Rating</h4>
                     <div className="w-24 h-12 overflow-hidden relative">
                         <div className="w-24 h-24 rounded-full border-[12px] border-slate-100 border-b-transparent border-r-transparent rotate-45"></div>
                         <div className="w-24 h-24 rounded-full border-[12px] border-yellow-400 border-b-transparent border-r-transparent rotate-45 absolute top-0 left-0" style={{ transform: `rotate(${risk.likelihood*risk.impact * 3}deg)`}}></div>
                     </div>
                     <span className="mt-2 font-semibold text-yellow-600">{level} ({score})</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-xs text-slate-500 mb-1 border-b pb-1">Likelihood</p>
                        <p className="text-sm">{risk.likelihood}/5</p>
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 mb-1 border-b pb-1">Impact</p>
                        <p className="text-sm">{risk.impact}/5</p>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'control' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Existing Controls</h3>
                  <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">View Context</Button>
               </div>

               <div className="bg-white p-6 rounded-md border flex items-center justify-between">
                  <div className="space-y-6 w-2/3">
                     <div className="space-y-2 relative">
                        <p className="text-sm font-medium text-slate-600 text-center mb-4">Design Effectiveness</p>
                        <div className="w-full h-1 bg-slate-200 rounded-lg relative">
                           <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-2 h-2 rounded-full bg-slate-400"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-2">
                           <span>Absent</span>
                           <span>Inadequate</span>
                           <span>Adequate</span>
                        </div>
                     </div>
                     <div className="space-y-2 relative">
                        <p className="text-sm font-medium text-slate-600 text-center mb-4">Operating Effectiveness</p>
                        <div className="w-full h-1 bg-slate-200 rounded-lg relative">
                           <div className="absolute top-1/2 -translate-y-1/2 left-3/4 w-2 h-2 rounded-full bg-slate-400"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-2">
                           <span>Not Implemented</span>
                           <span>Ineffective</span>
                           <span>Partially Effective</span>
                           <span>Effective</span>
                        </div>
                     </div>
                  </div>
                  <div className="w-1/3 flex flex-col items-center justify-center border-l ml-8 pl-8">
                     <p className="text-sm text-slate-500 mb-2">Combined Control Rating</p>
                     <span className="text-3xl font-light text-slate-800">
                        {mappedControls.length > 0 ? (avgEffectiveness * 100).toFixed(0) + '%' : 'NA'}
                     </span>
                  </div>
               </div>

               <div className="border rounded-md bg-white">
                  <div className="px-4 py-3 flex justify-between items-center bg-slate-50 border-b">
                     <h4 className="text-sm font-medium text-slate-700">Individual Control Details</h4>
                     <div className="flex gap-3 text-xs text-indigo-600 font-medium">
                        <span className="cursor-pointer hover:underline">Add Control</span>
                        <span className="cursor-pointer hover:underline">Control Register</span>
                        <span className="cursor-pointer hover:underline">Control Library</span>
                     </div>
                  </div>
                  {mappedControls.length === 0 ? (
                     <div className="p-8 text-center text-slate-400 text-sm">
                        No Data
                     </div>
                  ) : (
                     <div className="p-0">
                        <table className="w-full">
                           <thead className="bg-[#1e293b] text-white text-xs">
                              <tr>
                                 <th className="py-2 px-4 text-left font-medium">Control ID</th>
                                 <th className="py-2 px-4 text-left font-medium">Control</th>
                                 <th className="py-2 px-4 text-left font-medium">Type</th>
                                 <th className="py-2 px-4 text-left font-medium">Weightage</th>
                              </tr>
                           </thead>
                           <tbody className="text-sm divide-y">
                              {mappedControls.map(({ mapping, control }) => (
                                 <tr key={mapping.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-2 px-4 text-indigo-600 cursor-pointer">{control.code}</td>
                                    <td className="py-2 px-4">{control.title}</td>
                                    <td className="py-2 px-4">{control.type}</td>
                                    <td className="py-2 px-4">{(mapping.weight * 100).toFixed(0)}%</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>

               <div className="border rounded-md divide-y bg-white">
                  <div className="bg-rose-50/20 p-6 flex items-center justify-between border-b px-12 gap-12">
                     <div className="w-2/3">
                        <h4 className="text-sm font-medium text-slate-500 mb-6">Residual Risk Rating</h4>
                        <div className="space-y-8">
                           <div className="space-y-2 relative">
                              <p className="text-sm font-medium text-slate-600 mb-2">Overall Likelihood</p>
                              <div className="w-full h-2 bg-slate-200 rounded-lg relative">
                                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/3 h-2 bg-indigo-900 rounded-lg"></div>
                                 <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-4 h-4 rounded-full bg-indigo-900 border-2 border-white shadow-sm -ml-2"></div>
                              </div>
                           </div>
                           <div className="space-y-2 relative">
                              <p className="text-sm font-medium text-slate-600 mb-2">Overall Impact</p>
                              <div className="w-full h-2 bg-slate-200 rounded-lg relative">
                                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/4 h-2 bg-indigo-900 rounded-lg"></div>
                                 <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-4 h-4 rounded-full bg-indigo-900 border-2 border-white shadow-sm -ml-2"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="w-1/3 flex flex-col items-center justify-center border-l pl-12 h-full">
                        <p className="text-sm text-slate-500 mb-4">Residual Rating</p>
                        <span className="text-lg font-semibold text-slate-800">{residualLevel} ({residualScore})</span>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'treatment' && (
            <div className="space-y-6">
               <div className="border rounded-md bg-white">
                  <div className="px-4 py-3 flex justify-between items-center bg-slate-50 border-b">
                     <h4 className="text-sm font-medium text-slate-700">Treatment Plan Details</h4>
                     <div className="flex gap-3 text-xs text-indigo-600 font-medium">
                        <span className="cursor-pointer hover:underline">Add Treatment</span>
                     </div>
                  </div>
                  {mappedTreatments.length === 0 ? (
                     <div className="p-8 text-center text-slate-400 text-sm">
                        No Data
                     </div>
                  ) : (
                     <div className="p-0">
                        <table className="w-full">
                           <thead className="bg-[#1e293b] text-white text-xs">
                              <tr>
                                 <th className="py-2 px-4 text-left font-medium">Treatment ID</th>
                                 <th className="py-2 px-4 text-left font-medium">Title</th>
                                 <th className="py-2 px-4 text-left font-medium">Strategy</th>
                                 <th className="py-2 px-4 text-left font-medium">Progress</th>
                              </tr>
                           </thead>
                           <tbody className="text-sm divide-y">
                              {mappedTreatments.map(t => (
                                 <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-2 px-4 text-indigo-600">{t.id}</td>
                                    <td className="py-2 px-4">{t.title}</td>
                                    <td className="py-2 px-4">{t.strategy}</td>
                                    <td className="py-2 px-4">
                                       <div className="flex items-center gap-2">
                                          <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                             <div className="bg-blue-500 h-1.5" style={{ width: `${t.progress}%` }}></div>
                                          </div>
                                          <span className="text-xs text-slate-500">{t.progress}%</span>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
