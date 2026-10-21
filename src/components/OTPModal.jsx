import React from "react";

export default function OTPModal({ setShowOTP }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[400px] relative">

        <button
          onClick={() => setShowOTP(false)}
          className="absolute right-4 top-4"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-center">
          OTP Verification
        </h1>

        <p className="text-center text-sm mt-2">
          Enter the OTP sent to your Mobile Number.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <input
              key={i}
              className="w-14 h-14 border rounded-xl text-center text-xl focus:border-black"
              maxLength="1"
            />
          ))}
        </div>

        <p className="text-center mt-4 text-sm">
          Resend OTP in 01:05
        </p>

        <button className="w-full bg-gray-300 text-white py-3 rounded-full mt-6">
          Verify
        </button>

        <p className="text-xs text-center mt-4">
          Privacy Notice and Terms of use
        </p>
      </div>
    </div>
  );
}