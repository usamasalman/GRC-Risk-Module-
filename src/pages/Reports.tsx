import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'All Risks', description: 'Displays all risks in the organization with filters to filter out risk according to multiple parameters.', isSelectable: false },
    { title: 'Key Risk', description: 'Displays list of all risks in the organization which are marked as Key Risks', isSelectable: false },
    { title: 'Appetite Breached', description: 'Displays list of all risks in the organization whose appetite against each category has been breached', isSelectable: false },
    { title: 'Control Register', description: 'Displays list of all controls in the organization.', isSelectable: false },
    { title: 'Comprehensive Risk Report', description: 'Get a comprehensive risk report on a single click', isSelectable: false },
    { title: 'Enterprise Risk Summary Report', description: 'Get an enterprise-level risk summary report on a single click', isSelectable: false },
    { title: 'Departmental Risk Summary Report', description: 'Get a departmental level risk summary report on a single click', isSelectable: true },
    { title: 'Division Risk Summary Report', description: 'Get a division level risk summary report on a single click', isSelectable: true },
    { title: 'Quarterly Report', description: 'Displays all risks in the organization with filters to filter out risk according to multiple parameters.', isSelectable: false },
    { title: 'Root Cause Report', description: 'Displays list of all root causes in the organization.', isSelectable: false },
    { title: 'Risk Consequences Report', description: 'Displays list of all risk consequences in the organization.', isSelectable: false },
    { title: 'KRI Breached Report', description: 'Displays a list of all Key Risk Indicators (KRIs) have breached their threshold limits', isSelectable: false },
    { title: 'Departmental Risk Detail Report', description: 'Get department risk detail report on a single click', isSelectable: true, isBottom: true },
    { title: 'Division Risk Detail Report', description: 'Get division risk detail report on a single click', isSelectable: true, isBottom: true },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          Reports
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="bg-[#1e293b]">
             <Plus className="mr-2 h-4 w-4" /> Create Risk
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {reports.map((report, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between">
               <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                     <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                           {report.title}
                        </h4>
                        {!report.isSelectable && (
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                              <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-600" />
                           </div>
                        )}
                     </div>
                     <p className="text-xs text-slate-500 mt-2 leading-relaxed">{report.description}</p>
                     
                     {report.isSelectable && (
                        <div className="mt-4">
                           <select className="w-full text-xs border-slate-200 rounded-md shadow-sm bg-slate-50 p-2 text-slate-500 appearance-none outline-none focus:ring-1 focus:ring-indigo-500">
                              <option>Select {report.title.includes('Department') ? 'a department' : 'a division'} risk detail report</option>
                           </select>
                        </div>
                     )}
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  );
}
