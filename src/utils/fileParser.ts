
// Enhanced file parsing utility for job descriptions in various formats
export const parseJobDescriptionFile = async (file: File): Promise<string> => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  console.log('Parsing file:', fileName, 'Type:', fileType);
  
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
      // Try to parse as text for unsupported formats
      console.log('Unsupported format, attempting text parsing');
      return await parseAsText(file);
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    // Fallback to basic text extraction
    try {
      return await parseAsText(file);
    } catch (fallbackError) {
      throw new Error('Failed to parse the job description file. Please ensure the file contains readable text.');
    }
  }
};

const parsePDFFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Convert to string and extract readable text
        let text = '';
        for (let i = 0; i < uint8Array.length; i++) {
          const char = String.fromCharCode(uint8Array[i]);
          if (char.match(/[\x20-\x7E\n\r]/)) {
            text += char;
          }
        }
        
        // Clean up the extracted text
        const cleanText = text
          .replace(/[^\w\s\n\r.,;:!?()\-+\/]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        console.log('PDF text extracted:', cleanText.substring(0, 200) + '...');
        
        if (cleanText.length < 20) {
          reject(new Error('Could not extract readable text from PDF. The file might be image-based or corrupted.'));
        } else {
          resolve(cleanText);
        }
      } catch (error) {
        console.error('PDF parsing error:', error);
        reject(new Error('Failed to parse PDF file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
};

const parseWordFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Extract text from Word document binary
        let text = '';
        for (let i = 0; i < uint8Array.length; i++) {
          const char = String.fromCharCode(uint8Array[i]);
          if (char.match(/[\x20-\x7E\n\r]/)) {
            text += char;
          }
        }
        
        // Clean up extracted text
        const cleanText = text
          .replace(/[^\w\s\n\r.,;:!?()\-+\/]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        console.log('Word text extracted:', cleanText.substring(0, 200) + '...');
        
        if (cleanText.length < 20) {
          reject(new Error('Could not extract readable text from Word document.'));
        } else {
          resolve(cleanText);
        }
      } catch (error) {
        console.error('Word parsing error:', error);
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
      console.log('Text file parsed:', text.substring(0, 200) + '...');
      resolve(text.trim());
    };
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};

const parseAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        if (text && text.trim().length > 10) {
          console.log('Fallback text parsing successful:', text.substring(0, 200) + '...');
          resolve(text.trim());
        } else {
          reject(new Error('No readable text found in file'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
