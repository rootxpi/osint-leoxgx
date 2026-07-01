import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tool, query } = await request.json();
  const KEY = "@noob11001"; 
  let url = "";

  if (tool === 'number') {
    
    url = `https://number2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&mobile=${query}`;
  } else if (tool === 'number-advance') {
    
    url = `https://number-aadvance-info-noobster.com-dashbord63hh7qe4.workers.dev/?key=demo&mobile=${query}`;

    } else if (tool === 'number-ultimate') {
    url = `https://numtoinfo.nonamearyan.workers.dev/?mobile=${query}`;
  
  } else if (tool === 'aadhaar') {
    url = `https://adhaar-to-info-hidb-noobster.com-dashbord63hh7qe4.workers.dev/?aadhar=${query}`;
  } else if (tool === 'vehicle') {
    url = `https://vehicle2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&rc=${query}`;
  } else if (tool === 'vehicle-advance') {
    url = `https://vehicleto-adavanceinfo-noobster.com-dashbord63hh7qe4.workers.dev/?rc=${query}`;
  } else if (tool === 'tg') {
    url = `https://tg-to-num-rate-limit.onrender.com/TG/user/=${query}`;
  } else if (tool === 'ip') {
    url = `https://ipwho.is/${query}`;
  } else if (tool === 'gmail') {
    url = `https://gmail2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&email=${query}`;
  } else {
    return NextResponse.json({ error: "Invalid Tool" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
