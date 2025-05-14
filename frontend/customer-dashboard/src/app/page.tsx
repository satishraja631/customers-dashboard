import CreateEventForm from "@/components/CreateEventForm";
import HistoryTable from "@/components/HistoryTable";
import LiveTable from "@/components/LiveTable";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Tracking Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
     
        <div className="bg-white shadow-md rounded-2xl p-6">
          <CreateEventForm />
        </div>

    
        <div className="bg-white shadow-md rounded-2xl p-6 max-h-[400px] overflow-y-auto">
          <LiveTable />
        </div>

      
        <div className="bg-white shadow-md rounded-2xl p-6 max-h-[400px] overflow-y-auto">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
