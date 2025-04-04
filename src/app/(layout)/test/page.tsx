export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-primary-navy4 text-5xl font-bold mb-6">🎉 Tailwind 적용 성공!</h1>
      <p className="text-lg mb-4">이 페이지가 잘 보이면 TailwindCSS가 정상 작동 중입니다.</p>
      <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition">
        버튼 테스트
      </button>
    </div>
  );
}
