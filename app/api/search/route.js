import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tool, query } = await request.json();
  const KEY = "@noob11001"; 
  let url = "";

  if (tool === 'number') {
    url = `https://number2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&mobile=${query}`;
  } else if (tool === 'aadhaar') {
    url = `https://adhaar2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&id=${query}`;
  } else if (tool === 'vehicle') {
    url = `https://vehicle2info-noobster.com-dashbord63hh7qe4.workers.dev/?key=${KEY}&rc=${query}`;
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

