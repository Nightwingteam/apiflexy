#!/bin/bash

echo "🚀 Starting ApiFlexy Phase 1 - Optimized & Mobile Ready!"
echo "=============================================="

# Start Backend
echo "📡 Starting Backend Server..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
echo "✅ Backend started on http://localhost:8000 (PID: $BACKEND_PID)"

# Wait for backend to start
sleep 3

# Start Frontend
echo "🌐 Starting Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "✅ Frontend starting on http://localhost:3000 (PID: $FRONTEND_PID)"

echo ""
echo "🎉 ApiFlexy Phase 1 is now running!"
echo "📱 Mobile responsive and fully optimized"
echo "🔗 Frontend: http://localhost:3000"
echo "🔗 Backend: http://localhost:8000"
echo "📊 API Providers: $(curl -s http://localhost:8000/api/providers | jq length) available"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 