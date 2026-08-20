import React, { useState } from 'react';
import { AuthUser } from '../../types';
import { submitEscalationRequest } from '../../services/api';
import { PhoneCall, X, Send, CheckCircle2, User, HelpCircle, ShieldCheck } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  defaultTargetType?: 'teacher' | 'principal';
  defaultStudentName?: string;
  onSuccessPrompt?: (msg: string) => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  user,
  defaultTargetType = 'teacher',
  defaultStudentName,
  onSuccessPrompt
}) => {
  const [targetType, setTargetType] = useState<'teacher' | 'principal'>(defaultTargetType);
  const [studentName, setStudentName] = useState(defaultStudentName || (user.role === 'student' ? user.name : 'Rahul Sharma'));
  const [reason, setReason] = useState('Requesting discussion regarding recent attendance trend and subject coverage.');
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setSubmitting(true);
    try {
      const res = await submitEscalationRequest({
        targetType,
        studentName,
        reason: reason.trim()
      });

      if (res.success) {
        setSuccessData(res.data);
        if (onSuccessPrompt) {
          onSuccessPrompt(`I have submitted an official ${targetType === 'teacher' ? 'teacher consultation' : 'management escalation'} ticket #${res.data?.request_id}.`);
        }
      }
    } catch (err) {
      console.error('Failed to submit consultation request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Official Academic Consultation Ticket</h2>
              <p className="text-[11px] text-slate-400">Create an official ERP escalation record</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSuccessData(null);
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {successData ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Consultation Request Confirmed</h3>
              <p className="text-xs text-slate-300 mt-1">
                Ticket <span className="font-mono text-emerald-400 font-bold">#{successData.request_id}</span> has been logged in the ERP system.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-xs text-left text-slate-400 space-y-1">
              <div><span className="text-slate-500">Target Officer:</span> <span className="text-slate-200">{successData.assigned_teacher_id || successData.target || 'Class Teacher'}</span></div>
              <div><span className="text-slate-500">Student:</span> <span className="text-slate-200">{successData.student || studentName}</span></div>
              <div><span className="text-slate-500">Expected SLA:</span> <span className="text-slate-200">Callback within 24 school hours</span></div>
            </div>
            <button
              onClick={() => {
                setSuccessData(null);
                onClose();
              }}
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Consultation Level</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetType('teacher')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    targetType === 'teacher'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Class Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('principal')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    targetType === 'principal'
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Principal Office
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Reason for Consultation</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                placeholder="State the concern or inquiry..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Submitting Request...' : 'Submit Official Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
