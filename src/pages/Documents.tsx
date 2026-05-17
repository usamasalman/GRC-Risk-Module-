import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, FileText } from 'lucide-react';

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          Documents
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="bg-[#1e293b]">
             <Plus className="mr-2 h-4 w-4" /> Create Risk
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b pb-4 mb-6">
         <div className="flex items-center gap-6 text-sm font-medium">
            <button className="text-indigo-600 border-b-2 border-indigo-600 pb-4 -mb-4">All</button>
            <button className="text-slate-500 hover:text-slate-800 pb-4 -mb-4">Framework</button>
            <button className="text-slate-500 hover:text-slate-800 pb-4 -mb-4">Risk Appetite Statements</button>
         </div>
         <div className="relative">
            <input type="text" placeholder="Search" className="w-64 pl-8 pr-4 py-1.5 border rounded-md text-sm bg-white border-slate-200" />
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
               </div>
               <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 flex justify-between group-hover:text-indigo-600 transition-colors">
                     COSO Framework
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">COSO Framework Documentation</p>
                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-[10px] font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Framework</span>
                     <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></span>
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
               </div>
               <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 flex justify-between group-hover:text-indigo-600 transition-colors">
                     Risk Management Framework
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">Risk Management Framework for Information Systems and Organizations</p>
                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-[10px] font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Framework</span>
                     <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></span>
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600" />
               </div>
               <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 flex justify-between group-hover:text-indigo-600 transition-colors">
                     Risk Appetite Statements
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">Risk Appetite Statements</p>
                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-[10px] font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Risk Appetite Statements</span>
                     <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
