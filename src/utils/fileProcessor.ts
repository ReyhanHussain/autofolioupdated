export class FileProcessor {
  static async extractTextFromFile(file: File): Promise<string> {
    const fileType = file.type;
    
    if (fileType === 'application/pdf') {
      return this.extractTextFromPDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return this.extractTextFromDOCX(file);
    } else if (fileType === 'text/plain') {
      return this.extractTextFromTXT(file);
    } else {
      throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
    }
  }

  private static async extractTextFromPDF(file: File): Promise<string> {
    // Simplified PDF text extraction (in production, use PDF.js or similar)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const text = this.parseSimplePDF(arrayBuffer);
          resolve(text);
        } catch (error) {
          reject(new Error('Failed to extract text from PDF'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    });
  }

  private static async extractTextFromDOCX(file: File): Promise<string> {
    // Simplified DOCX text extraction (in production, use mammoth.js or similar)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          // Basic text extraction for demo purposes
          resolve(text.replace(/<[^>]*>/g, ''));
        } catch (error) {
          reject(new Error('Failed to extract text from DOCX'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read DOCX file'));
      reader.readAsText(file);
    });
  }

  private static async extractTextFromTXT(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }

  private static parseSimplePDF(arrayBuffer: ArrayBuffer): string {
    // Very basic PDF text extraction for demo
    // In production, use a proper PDF parsing library
    const view = new Uint8Array(arrayBuffer);
    let text = '';
    
    for (let i = 0; i < view.length - 1; i++) {
      if (view[i] >= 32 && view[i] <= 126) {
        text += String.fromCharCode(view[i]);
      } else {
        text += ' ';
      }
    }
    
    // Clean up the extracted text
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\x20-\x7E\n]/g, '')
      .trim();
  }

  static validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported. Please upload PDF, DOCX, or TXT files.' };
    }

    return { valid: true };
  }
}