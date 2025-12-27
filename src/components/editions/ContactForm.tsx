import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z.string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call (replace with actual backend integration)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create mailto link as fallback
    const mailtoLink = `mailto:duttasayan835@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast.success('Message prepared! Opening email client...', {
      description: 'Your message has been composed.',
    });
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  const inputClasses = cn(
    'w-full px-4 py-3 bg-card/50 border border-border/50 rounded-lg',
    'text-foreground placeholder:text-muted-foreground/50',
    'focus:outline-none focus:border-editions-gold/50 focus:ring-1 focus:ring-editions-gold/20',
    'transition-all duration-300'
  );

  const labelClasses = 'block text-sm font-medium text-foreground mb-2';

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name')}
              className={cn(inputClasses, errors.name && 'border-destructive')}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-destructive"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              className={cn(inputClasses, errors.email && 'border-destructive')}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-destructive"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClasses}>Subject</label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            placeholder="What's this about?"
            {...register('subject')}
            className={cn(inputClasses, errors.subject && 'border-destructive')}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <AlertCircle className="w-4 h-4 text-destructive" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs text-destructive"
          >
            {errors.subject.message}
          </motion.p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>Message</label>
        <div className="relative">
          <textarea
            id="message"
            placeholder="Tell me about your project..."
            rows={5}
            {...register('message')}
            className={cn(inputClasses, 'resize-none', errors.message && 'border-destructive')}
          />
        </div>
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs text-destructive"
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg',
          'font-medium text-background bg-foreground',
          'hover:scale-[1.02] active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          'transition-all duration-300'
        )}
        whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Message Sent!</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
};
