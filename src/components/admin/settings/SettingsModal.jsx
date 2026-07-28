"use client"

import React from "react"
import { X } from "lucide-react"

export const SettingsModal = ({ title, subtitle, onClose, children, footer, maxWidth = "max-w-lg" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[90vh] flex flex-col`}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer active:scale-95 transition-all duration-150"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto bg-white">{children}</div>

        {footer && <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}