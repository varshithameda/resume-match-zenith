
// File parsing utility for job descriptions in various formats
export const parseJobDescriptionFile = async (file: File): Promise<string> => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await parsePDFFile(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword' ||
      fileName.endsWith('.docx') ||
      fileName.endsWith('.doc')
    ) {
      return await parseWordFile(file);
    } else if (fileType.startsWith('text/') || fileName.endsWith('.txt')) {
      return await parseTextFile(file);
    } else {
      throw new Error('Unsupported file format. Please use PDF, Word, DOCX, or TXT files.');
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse the job description file. Please try again or use a text format.');
  }
};

const parsePDFFile = async (file: File): Promise<string> => {
  // For now, we'll use a simple approach since PDF parsing requires external libraries
  // In a real implementation, you'd use libraries like pdf-parse or PDF.js
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // This is a simplified approach - in reality, PDF parsing is more complex
      const text = reader.result as string;
      // Extract readable text (this is a basic approach)
      const cleanText = text.replace(/[^\x20-\x7E\n]/g, '').replace(/\s+/g, ' ').trim();
      if (cleanText.length < 50) {
        reject(new Error('Could not extract readable text from PDF. Please try a text-based format.'));
      } else {
        resolve(cleanText);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsText(file);
  });
};

const parseWordFile = async (file: File): Promise<string> => {
  // For Word documents, we'll use a basic approach
  // In a real implementation, you'd use libraries like mammoth.js
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const text = new TextDecoder().decode(arrayBuffer);
        // Extract readable text (basic approach)
        const cleanText = text.replace(/[^\x20-\x7E\n]/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanText.length < 50) {
          reject(new Error('Could not extract readable text from Word document. Please try a text-based format.'));
        } else {
          resolve(cleanText);
        }
      } catch (error) {
        reject(new Error('Failed to parse Word document'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read Word document'));
    reader.readAsArrayBuffer(file);
  });
};

const parseTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      resolve(text.trim());
    };
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};
